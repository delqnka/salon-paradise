"use client";

import { motion } from "motion/react";
import theme from "@/theme.config";
import { useBooking } from "./BookingProvider";

export default function BookingSection() {
  const booking = useBooking();
  return (
    <section
      id="booking"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #9B7FD4 0%, #C4A8E8 50%, #EC4899 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-script text-white/80 text-2xl block mb-2">
            Запишете се онлайн
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            Резервирайте вашия час
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Незабавно потвърждение на резервацията. Изберете услуга, дата и час
            директно онлайн.
          </p>

          <div className="flex flex-col items-center gap-3 mb-12">
            <button
              type="button"
              onClick={() => booking.open()}
              className="bg-white text-purple-700 px-10 py-4 rounded-full font-semibold text-sm tracking-widest uppercase hover:bg-purple-50 transition-colors shadow-xl"
            >
              Резервирай сега
            </button>
            <a
              href={`tel:${theme.salon.phone}`}
              className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs tracking-wider uppercase transition-colors"
            >
              <span aria-hidden>📞</span>
              <span>Обади се</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { icon: "✓", text: "Незабавно потвърждение" },
              { icon: "✓", text: "Безплатна промяна" },
              { icon: "✓", text: "SMS напомняне" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                  {item.icon}
                </div>
                <span className="text-white/80 text-xs text-center">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
