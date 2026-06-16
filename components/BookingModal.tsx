"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  createBooking,
  fetchOccupiedSlots,
  formatDuration,
  formatPrice,
  generateTimeSlots,
  type ClickaSalon,
  type ClickaService,
} from "@/lib/clicka";

type Props = {
  open: boolean;
  onClose: () => void;
  services: ClickaService[];
  workingHours: ClickaSalon["working_hours"];
  preselectedService?: ClickaService | null;
};

type Step = "service" | "datetime" | "contact" | "submitting" | "done";

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function addDaysISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDateBg(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("bg-BG", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function BookingModal({
  open,
  onClose,
  services,
  workingHours,
  preselectedService,
}: Props) {
  const [step, setStep] = useState<Step>(preselectedService ? "datetime" : "service");
  const [selectedService, setSelectedService] = useState<ClickaService | null>(
    preselectedService || null
  );
  const [date, setDate] = useState<string>(todayISO());
  const [time, setTime] = useState<string>("");
  const [occupied, setOccupied] = useState<{ time: string; duration: number }[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dateOptions = useMemo(
    () => Array.from({ length: 14 }, (_, i) => addDaysISO(i)),
    []
  );

  useEffect(() => {
    if (!open) return;
    if (preselectedService) {
      setSelectedService(preselectedService);
      setStep("datetime");
    } else {
      setStep("service");
    }
  }, [open, preselectedService]);

  useEffect(() => {
    if (step !== "datetime" || !selectedService) return;
    setLoadingSlots(true);
    setTime("");
    fetchOccupiedSlots(date).then((occ) => {
      setOccupied(occ);
      setLoadingSlots(false);
    });
  }, [step, date, selectedService]);

  const availableSlots = useMemo(() => {
    if (!selectedService) return [];
    return generateTimeSlots(workingHours, date, selectedService.duration_min, occupied);
  }, [workingHours, date, selectedService, occupied]);

  const reset = () => {
    setStep(preselectedService ? "datetime" : "service");
    setSelectedService(preselectedService || null);
    setDate(todayISO());
    setTime("");
    setName("");
    setPhone("");
    setEmail("");
    setError(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleSubmit = async () => {
    if (!selectedService || !date || !time || !name || !phone || !email) return;
    setError(null);
    setStep("submitting");
    const result = await createBooking({
      clientName: name.trim(),
      clientPhone: phone.trim(),
      clientEmail: email.trim(),
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      serviceDuration: selectedService.duration_min,
      date,
      time,
    });
    if (result.ok) {
      setStep("done");
    } else {
      setError(result.error);
      setStep("contact");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-5 pt-5 pb-4 text-white relative"
              style={{ background: "linear-gradient(135deg, #9B7FD4 0%, #EC4899 100%)" }}
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Затвори"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-lg"
              >
                ×
              </button>
              <div className="text-[11px] uppercase tracking-widest text-white/70 mb-1">
                Резервация
              </div>
              <div className="font-heading text-2xl font-bold">
                {step === "done" ? "Готово!" : "Запазете час"}
              </div>
              {selectedService && step !== "done" && (
                <div className="mt-3 text-sm text-white/90 flex items-center justify-between gap-2">
                  <span className="truncate">{selectedService.name}</span>
                  <span className="font-semibold whitespace-nowrap">
                    {formatPrice(selectedService.price)} ·{" "}
                    {formatDuration(selectedService.duration_min)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {step === "service" && (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 mb-3">Изберете услуга:</div>
                  {services.map((s) => (
                    <button
                      key={s.id || s.name}
                      type="button"
                      onClick={() => {
                        setSelectedService(s);
                        setStep("datetime");
                      }}
                      className="w-full text-left p-3 rounded-xl border-2 border-purple-100 hover:border-purple-400 transition-colors"
                    >
                      <div className="font-semibold text-gray-800 text-sm">{s.name}</div>
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>{formatDuration(s.duration_min)}</span>
                        <span className="font-bold text-purple-600">
                          {formatPrice(s.price)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === "datetime" && (
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Дата:</div>
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                      {dateOptions.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDate(d)}
                          className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all border-2 ${
                            date === d
                              ? "border-purple-500 bg-purple-50 text-purple-700"
                              : "border-gray-200 text-gray-600 hover:border-purple-200"
                          }`}
                        >
                          {formatDateBg(d)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-2">Час:</div>
                    {loadingSlots ? (
                      <div className="text-center text-gray-400 text-sm py-6">
                        Зарежда се...
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center text-gray-400 text-sm py-6">
                        Няма свободни часове на тази дата.
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {availableSlots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setTime(t);
                              setStep("contact");
                            }}
                            className="py-2.5 rounded-xl text-sm font-semibold border-2 border-purple-100 text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {!preselectedService && (
                    <button
                      type="button"
                      onClick={() => setStep("service")}
                      className="text-xs text-gray-500 underline"
                    >
                      ← Назад към услугите
                    </button>
                  )}
                </div>
              )}

              {step === "contact" && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 mb-1">
                    Час: <b>{time}</b>, {formatDateBg(date)}
                  </div>
                  <input
                    type="text"
                    placeholder="Име"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 outline-none text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 outline-none text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Имейл"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 outline-none text-sm"
                  />
                  {error && (
                    <div className="text-red-500 text-xs">{error}</div>
                  )}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!name || !phone || !email}
                    className="w-full py-3.5 rounded-full text-white text-sm font-semibold tracking-wider uppercase disabled:opacity-50"
                    style={{
                      background: "linear-gradient(135deg, #9B7FD4 0%, #EC4899 100%)",
                    }}
                  >
                    Потвърди резервацията
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("datetime")}
                    className="text-xs text-gray-500 underline w-full text-center"
                  >
                    ← Назад към избор на час
                  </button>
                </div>
              )}

              {step === "submitting" && (
                <div className="py-12 text-center text-gray-500 text-sm">
                  Записваме резервацията...
                </div>
              )}

              {step === "done" && (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl mb-4">
                    ✓
                  </div>
                  <div className="font-heading text-xl font-bold text-gray-800 mb-2">
                    Резервацията е изпратена!
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    {selectedService?.name}
                  </div>
                  <div className="text-sm text-gray-600 mb-6">
                    {formatDateBg(date)} в <b>{time}</b>
                  </div>
                  <div className="text-xs text-gray-500 mb-6">
                    Ще получите потвърждение на {email}.
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-8 py-3 rounded-full text-sm font-semibold border-2 border-purple-300 text-purple-600"
                  >
                    Затвори
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
