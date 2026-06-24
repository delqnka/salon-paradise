'use client';
import { useT, serviceMatchesCategory } from './chunk-CANVXBHW.js';
import { X, Plus, ChevronDown, Check, User, Loader2 } from 'lucide-react';
import { useMemo, useState, useRef, useEffect } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

// ../../lib/booking-modal-catalog.ts
function getBookingRowIndex(bookingRows, catalogId, variantLabel) {
  if (variantLabel) {
    return bookingRows.findIndex((row) => row.id === `${catalogId}::${variantLabel}`);
  }
  const exact = bookingRows.findIndex((row) => row.id === catalogId);
  if (exact >= 0) return exact;
  return bookingRows.findIndex((row) => row.id.startsWith(`${catalogId}::`));
}
function isCatalogServiceSelected(selectedIdxs, bookingRows, catalog, variantLabel) {
  if (catalog.variants?.length) {
    const label = variantLabel ?? catalog.variants[0]?.label;
    const idx2 = label ? getBookingRowIndex(bookingRows, catalog.id, label) : -1;
    return idx2 >= 0 && selectedIdxs.includes(idx2);
  }
  const idx = getBookingRowIndex(bookingRows, catalog.id);
  return idx >= 0 && selectedIdxs.includes(idx);
}
function getCatalogDisplayPriceDuration(catalog, variantLabel) {
  const variants = catalog.variants ?? [];
  if (variants.length > 0) {
    const label = variantLabel ?? variants[0].label;
    const variant = variants.find((v) => v.label === label) ?? variants[0];
    return {
      price: Number(variant.price ?? catalog.price ?? 0) || 0,
      duration: Math.max(5, Number(variant.duration ?? catalog.duration ?? 30) || 30)
    };
  }
  return {
    price: Number(catalog.price ?? 0) || 0,
    duration: Math.max(5, Number(catalog.duration ?? 30) || 30)
  };
}

// ../../lib/cancellation-policy.ts
function formatPolicySummary(opts) {
  const { cancelPolicyHours, cancelPolicyAction, depositAmountEuros } = opts;
  const window2 = cancelPolicyHours >= 48 ? `${Math.round(cancelPolicyHours / 24)} \u0434\u043D\u0438` : `${cancelPolicyHours} \u0447\u0430\u0441\u0430`;
  if (cancelPolicyAction === "full_refund") {
    return `\u0411\u0435\u0437\u043F\u043B\u0430\u0442\u043D\u043E \u043E\u0442\u043A\u0430\u0437\u0432\u0430\u043D\u0435 \u0434\u043E ${window2} \u043F\u0440\u0435\u0434\u0438 \u0447\u0430\u0441\u0430. \u0421\u043B\u0435\u0434 \u0441\u0440\u043E\u043A\u0430 \u2014 \u043F\u044A\u043B\u0435\u043D refund.`;
  }
  if (cancelPolicyAction === "keep_full") {
    return `\u0411\u0435\u0437\u043F\u043B\u0430\u0442\u043D\u043E \u043E\u0442\u043A\u0430\u0437\u0432\u0430\u043D\u0435 \u0434\u043E ${window2} \u043F\u0440\u0435\u0434\u0438 \u0447\u0430\u0441\u0430. \u0421\u043B\u0435\u0434 \u0441\u0440\u043E\u043A\u0430 \u043F\u043B\u0430\u0442\u0435\u043D\u0430\u0442\u0430 \u0441\u0443\u043C\u0430 \u043D\u0435 \u0441\u0435 \u0432\u0440\u044A\u0449\u0430.`;
  }
  const depositStr = depositAmountEuros ? ` (\u20AC${depositAmountEuros})` : "";
  return `\u0411\u0435\u0437\u043F\u043B\u0430\u0442\u043D\u043E \u043E\u0442\u043A\u0430\u0437\u0432\u0430\u043D\u0435 \u0434\u043E ${window2} \u043F\u0440\u0435\u0434\u0438 \u0447\u0430\u0441\u0430. \u0421\u043B\u0435\u0434 \u0441\u0440\u043E\u043A\u0430 \u0434\u0435\u043F\u043E\u0437\u0438\u0442\u044A\u0442${depositStr} \u0441\u0435 \u0437\u0430\u0434\u044A\u0440\u0436\u0430.`;
}
function SalonServiceCategoryTabs({
  categories,
  selectedId,
  onSelect,
  size = "md",
  className = "",
  accentFill = "#111111"
}) {
  const named = categories.filter((c) => c.id != null);
  if (named.length === 0) return null;
  const textClass = size === "sm" ? "text-[12px]" : "text-sm";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center gap-4 overflow-x-auto pb-0.5 scrollbar-none ${textClass} ${className}`.trim(),
      role: "tablist",
      "aria-label": "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0443\u0441\u043B\u0443\u0433\u0438",
      children: categories.map((cat) => {
        const active = selectedId === cat.id;
        return /* @__PURE__ */ jsxs(
          "span",
          {
            role: "tab",
            "aria-selected": active,
            tabIndex: 0,
            onClick: () => onSelect(cat.id),
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(cat.id);
              }
            },
            className: `relative inline-block shrink-0 cursor-pointer select-none whitespace-nowrap pb-1.5 font-bold text-black transition ${active ? "" : "hover:opacity-80"}`,
            children: [
              cat.label,
              /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": true,
                  className: "absolute bottom-0 left-0 h-[2px] rounded-full transition-[width,opacity] duration-200",
                  style: {
                    width: active ? "100%" : "0%",
                    opacity: active ? 1 : 0,
                    backgroundImage: accentFill
                  }
                }
              )
            ]
          },
          cat.id ?? "all"
        );
      })
    }
  );
}
function BookingSuccessView({
  serviceName,
  dateLabel,
  time,
  salonName,
  onClose
}) {
  const t = useT();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t2 = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t2);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center justify-center px-6 py-10", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex flex-col items-center transition-all duration-700 ease-out ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative mb-6", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500 ease-out ${show ? "scale-100" : "scale-50"}`,
              style: { background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  className: "h-10 w-10",
                  "aria-hidden": true,
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      d: "M5 13l4 4L19 7",
                      stroke: "white",
                      strokeWidth: "2.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      className: show ? "animate-[draw_0.5s_ease-out_0.3s_forwards]" : "",
                      style: {
                        strokeDasharray: 24,
                        strokeDashoffset: show ? 0 : 24,
                        transition: "stroke-dashoffset 0.5s ease-out 0.3s"
                      }
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute inset-0 rounded-full transition-all duration-700 ease-out ${show ? "scale-150 opacity-0" : "scale-100 opacity-30"}`,
              style: { background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" },
              "aria-hidden": true
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "h3",
          {
            className: `text-center text-[22px] font-semibold leading-tight tracking-tight text-[#111] transition-all delay-200 duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`,
            children: t("booking.success.confirmed")
          }
        ),
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: `mt-2 text-center text-[15px] leading-relaxed text-black/45 transition-all delay-300 duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`,
            children: [
              t("booking.success.waitingAt"),
              " ",
              /* @__PURE__ */ jsx("span", { className: "font-medium text-black/60", children: salonName })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `mt-6 w-full max-w-[320px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all delay-[400ms] duration-500 ${show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "space-y-3 px-5 py-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/[0.04]", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4 text-black/40", "aria-hidden": true, children: [
                  /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z", clipRule: "evenodd" }),
                  /* @__PURE__ */ jsx("path", { d: "M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" })
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-medium uppercase tracking-wide text-black/30", children: t("booking.success.labelService") }),
                  /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[14px] font-medium leading-snug text-[#111]", children: serviceName })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-px bg-black/[0.05]" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/[0.04]", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 20 20", fill: "currentColor", className: "h-4 w-4 text-black/40", "aria-hidden": true, children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z", clipRule: "evenodd" }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] font-medium uppercase tracking-wide text-black/30", children: t("booking.success.labelWhen") }),
                  /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[14px] font-medium leading-snug text-[#111]", children: t("booking.success.timeFormat", { date: dateLabel, time }) })
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: `mt-8 w-full max-w-[320px] rounded-full bg-[#111] py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-all delay-500 duration-500 active:scale-[0.98] ${show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`,
            children: t("booking.success.done")
          }
        )
      ]
    }
  ) });
}
var cardShadow = "shadow-[0_2px_6px_rgba(0,0,0,0.14),0_10px_32px_rgba(0,0,0,0.18),0_1px_2px_rgba(0,0,0,0.1)]";
var gradientCtaShadow = "shadow-[0_8px_28px_rgba(0,0,0,0.18)]";
var gradientRingShadow = "shadow-[0_2px_10px_rgba(0,0,0,0.08)]";
var fieldClass = `mt-1.5 block w-full min-w-0 max-w-full box-border rounded-2xl border border-black/[0.06] bg-white px-3.5 py-3 text-[16px] leading-tight text-[#111] touch-manipulation ${cardShadow} outline-none transition focus:border-[color:var(--salon-primary)]/40 focus:ring-2 focus:ring-[color:var(--salon-primary)]/12`;
function addMinutesToTime(time, minutesToAdd) {
  const [h, m] = time.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return time;
  const total = h * 60 + m + minutesToAdd;
  const outH = Math.floor(total / 60) % 24;
  const outM = total % 60;
  return `${String(outH).padStart(2, "0")}:${String(outM).padStart(2, "0")}`;
}
function ServiceDescription({ text }) {
  const description = text?.trim();
  if (!description) return null;
  return /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-3 text-[12px] leading-relaxed text-black/50", children: description });
}
function SalonBookingModal({
  open,
  primaryColor,
  accentGradient,
  locale = "bg-BG",
  formatPrice,
  serviceCatalog,
  services,
  categoryTabs,
  selectedServiceIdxs,
  selectedDate,
  selectedTime,
  totalDuration,
  totalPrice,
  clientName,
  clientPhone,
  clientEmail,
  notes,
  salonName,
  termsHref,
  privacyHref,
  minDate,
  maxDate,
  timeSlots,
  paymentType = "none",
  depositAmount,
  cancelPolicyHours,
  cancelPolicyAction,
  isSubmitting,
  bookingError,
  bookingSuccess,
  bookingSuccessDetails,
  onClose,
  onToggleService,
  onDateChange,
  onTimeChange,
  onClientNameChange,
  onClientPhoneChange,
  onClientEmailChange,
  onNotesChange,
  onSubmit,
  staffMembers = [],
  selectedStaffMemberId,
  onStaffMemberChange,
  directStaffName
}) {
  const t = useT();
  const accentFill = useMemo(
    () => accentGradient ?? `linear-gradient(135deg, ${primaryColor}, ${primaryColor})`,
    [accentGradient, primaryColor]
  );
  const accentFillStyle = useMemo(
    () => ({ backgroundImage: accentFill }),
    [accentFill]
  );
  const accentBorderStyle = useMemo(
    () => ({
      border: "1px solid transparent",
      backgroundImage: `linear-gradient(#ffffff, #ffffff), ${accentFill}`,
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box, border-box"
    }),
    [accentFill]
  );
  const fmtPrice = useMemo(
    () => formatPrice ?? ((n) => `${Number.isInteger(n) ? n : n.toFixed(2)} \u20AC`),
    [formatPrice]
  );
  const isTeam = staffMembers.length > 0 && !directStaffName;
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [browseAllServices, setBrowseAllServices] = useState(true);
  const [selectedVariantByServiceId, setSelectedVariantByServiceId] = useState({});
  const [variantDropdownOpenForServiceId, setVariantDropdownOpenForServiceId] = useState(null);
  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (!open) return;
    setStep(1);
    setSelectedCategory(null);
    setVariantDropdownOpenForServiceId(null);
    const initial = {};
    for (const service of serviceCatalog) {
      const variants = service.variants ?? [];
      if (variants.length > 0) initial[service.id] = variants[0].label;
    }
    setSelectedVariantByServiceId(initial);
  }, [open, serviceCatalog]);
  const selectedServiceIds = useMemo(() => {
    return selectedServiceIdxs.map((idx) => services[idx]?.id).filter((id) => Boolean(id));
  }, [selectedServiceIdxs, services]);
  const eligibleStaff = useMemo(() => {
    if (!isTeam) return [];
    if (selectedServiceIds.length === 0) return staffMembers;
    return staffMembers.filter(
      (sm) => selectedServiceIds.every((sid) => sm.serviceIds.includes(sid))
    );
  }, [isTeam, staffMembers, selectedServiceIds]);
  useEffect(() => {
    if (!isTeam || eligibleStaff.length !== 1) return;
    onStaffMemberChange?.(eligibleStaff[0].id);
  }, [isTeam, eligibleStaff, onStaffMemberChange]);
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setBrowseAllServices(selectedServiceIdxs.length === 0);
    }
    prevOpenRef.current = open;
  }, [open, selectedServiceIdxs.length]);
  useEffect(() => {
    if (selectedServiceIdxs.length === 0) {
      setBrowseAllServices(true);
    } else {
      setBrowseAllServices(false);
    }
  }, [selectedServiceIdxs.length]);
  const hasServices = selectedServiceIdxs.length > 0;
  const endTime = useMemo(
    () => selectedTime ? addMinutesToTime(selectedTime, Math.max(5, totalDuration || 0)) : "",
    [selectedTime, totalDuration]
  );
  const selectedServices = useMemo(
    () => selectedServiceIdxs.map((idx) => services[idx]).filter((svc) => Boolean(svc)),
    [selectedServiceIdxs, services]
  );
  const visibleCatalog = useMemo(
    () => serviceCatalog.filter((service) => serviceMatchesCategory(service, selectedCategory)),
    [serviceCatalog, selectedCategory]
  );
  useEffect(() => {
    if (!selectedCategory) return;
    const hasCategory = serviceCatalog.some((svc) => serviceMatchesCategory(svc, selectedCategory));
    if (!hasCategory) setSelectedCategory(null);
  }, [serviceCatalog, selectedCategory]);
  function toggleCatalogService(service) {
    const variants = service.variants ?? [];
    const variantLabel = variants.length > 0 ? selectedVariantByServiceId[service.id] ?? variants[0].label : null;
    const idx = getBookingRowIndex(services, service.id, variantLabel);
    if (idx < 0) return;
    onToggleService(idx);
  }
  const dateOptions = useMemo(() => {
    if (!minDate || !maxDate) return [];
    const out = [];
    const start = /* @__PURE__ */ new Date(`${minDate}T12:00:00`);
    const end = /* @__PURE__ */ new Date(`${maxDate}T12:00:00`);
    const cursor = new Date(start);
    while (cursor <= end && out.length < 45) {
      const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
      out.push({
        iso,
        weekday: cursor.toLocaleDateString(locale, { weekday: "short" }),
        day: cursor.toLocaleDateString(locale, { day: "numeric", month: "short" })
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    return out;
  }, [minDate, maxDate, locale]);
  function goToStep(target) {
    if (isTeam) {
      if (target >= 2 && !hasServices) return;
      if (target >= 3 && !selectedStaffMemberId) return;
      if (target >= 4 && (!hasServices || !selectedTime)) return;
    } else {
      if (target >= 2 && !hasServices) return;
      if (target >= 3 && (!hasServices || !selectedTime)) return;
    }
    setStep(target);
  }
  const stepLabels = isTeam ? [
    { n: 1, label: t("booking.modal.stepService") },
    { n: 2, label: t("booking.modal.stepSpecialist") },
    { n: 3, label: t("booking.modal.stepTime") },
    { n: 4, label: t("booking.modal.stepDetails") }
  ] : [
    { n: 1, label: t("booking.modal.stepService") },
    { n: 2, label: t("booking.modal.stepTime") },
    { n: 3, label: t("booking.modal.stepDetails") }
  ];
  function requestClose() {
    if (typeof window !== "undefined") {
      const shouldClose = window.confirm(t("booking.modal.confirmClose"));
      if (!shouldClose) return;
    }
    onClose();
  }
  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    document.documentElement.style.setProperty("overflow", "hidden");
    document.documentElement.style.setProperty("background-color", "#ffffff");
    document.body.style.setProperty("overflow", "hidden");
    document.body.style.setProperty("position", "fixed");
    document.body.style.setProperty("inset", "0");
    document.body.style.setProperty("width", "100%");
    document.body.style.setProperty("background-color", "#ffffff");
    const scrollY = window.scrollY;
    document.body.style.setProperty("top", `-${scrollY}px`);
    return () => {
      document.documentElement.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("background-color");
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("inset");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("background-color");
      document.body.style.removeProperty("top");
      window.scrollTo(0, scrollY);
    };
  }, [open]);
  if (!open) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[110] overflow-hidden bg-white sm:bg-transparent", role: "presentation", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 hidden bg-black/30 backdrop-blur-sm sm:block", "aria-hidden": true }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        role: "dialog",
        "aria-modal": true,
        "aria-label": t("booking.modal.ariaLabel"),
        className: "absolute inset-x-0 bottom-0 z-10 mx-auto flex h-[100dvh] w-full max-w-none flex-col overflow-hidden bg-white sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[88vh] sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[1.6rem] sm:bg-white sm:shadow-[0_25px_60px_rgba(0,0,0,0.12)]",
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-black/10 sm:hidden", "aria-hidden": true }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-[1] flex shrink-0 items-center justify-between gap-2 bg-white px-4 pb-3 pt-3.5 sm:px-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[17px] font-semibold tracking-tight text-black", children: directStaffName ? t("booking.modal.titleWithStaff", { name: directStaffName }) : t("booking.modal.titleDefault") }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5", children: stepLabels.map(({ n, label }) => {
                const active = step === n;
                const complete = step > n;
                const disabled = isTeam ? n >= 2 && !hasServices || n >= 3 && !selectedStaffMemberId || n >= 4 && (!hasServices || !selectedTime) : n >= 2 && !hasServices || n >= 3 && (!hasServices || !selectedTime);
                return /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    disabled,
                    onClick: () => goToStep(n),
                    className: `inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full px-2.5 text-[11px] font-bold transition disabled:opacity-20 ${active || complete ? `text-white ${gradientCtaShadow}` : `bg-white text-black/50 ${cardShadow}`}`,
                    style: active || complete ? accentFillStyle : void 0,
                    title: label,
                    "aria-label": t("booking.modal.stepAria", { n, label }),
                    children: complete && !active ? "\u2713" : n
                  },
                  `header-step-${n}`
                );
              }) })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: `shrink-0 rounded-full bg-white p-2 text-black/40 transition active:bg-black/[0.03] ${cardShadow}`,
                onClick: requestClose,
                "aria-label": t("booking.modal.closeAria"),
                children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative z-[1] min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain bg-white px-4 py-5 sm:px-5", children: bookingSuccess ? bookingSuccessDetails ? /* @__PURE__ */ jsx(
            BookingSuccessView,
            {
              serviceName: bookingSuccessDetails.serviceName,
              dateLabel: bookingSuccessDetails.dateLabel,
              time: bookingSuccessDetails.time,
              salonName,
              onClose
            }
          ) : /* @__PURE__ */ jsx("p", { className: "rounded-2xl bg-emerald-50 px-3.5 py-3 text-sm leading-relaxed text-emerald-700", children: bookingSuccess }) : /* @__PURE__ */ jsxs("form", { id: "salon-booking-form", onSubmit, className: "min-w-0 space-y-3.5 bg-white", children: [
            step === 1 ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: hasServices && !browseAllServices ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold text-black", children: t("booking.modal.selectedServices") }),
                /* @__PURE__ */ jsx("p", { className: "text-[12px] font-medium tabular-nums text-black/40", children: t(selectedServices.length === 1 ? "booking.modal.serviceCountOne" : "booking.modal.serviceCountMany", { count: selectedServices.length }) })
              ] }),
              selectedServiceIdxs.map((idx) => {
                const svc = services[idx];
                if (!svc) return null;
                return /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `rounded-2xl p-px transition ${gradientRingShadow}`,
                    style: accentBorderStyle,
                    children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 rounded-[15px] bg-white px-3.5 py-3.5", children: [
                      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsx("p", { className: "truncate text-[16px] font-semibold text-black", children: svc.name }),
                        /* @__PURE__ */ jsx(ServiceDescription, { text: svc.description }),
                        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-[13px] tabular-nums text-black/70", children: [
                          svc.duration,
                          " ",
                          t("booking.modal.minSuffix"),
                          " \xB7 ",
                          fmtPrice(Number(svc.price ?? 0))
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => onToggleService(idx),
                          className: `mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border border-black/10 bg-white px-2.5 py-1.5 text-xs font-semibold text-black/60 transition active:bg-black/[0.04] ${cardShadow}`,
                          "aria-label": t("booking.modal.removeAria"),
                          children: [
                            /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5", "aria-hidden": true }),
                            t("booking.modal.remove")
                          ]
                        }
                      )
                    ] })
                  },
                  `selected-${svc.id}-${idx}`
                );
              }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setBrowseAllServices(true),
                  className: `flex w-full items-center justify-center gap-1.5 rounded-2xl bg-white px-3.5 py-3 text-sm font-semibold text-black ${cardShadow}`,
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4", "aria-hidden": true }),
                    t("booking.modal.addMoreServices")
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold text-black", children: t("booking.modal.services") }),
                /* @__PURE__ */ jsx("p", { className: "text-[12px] font-medium tabular-nums text-black/40", children: t(visibleCatalog.length === 1 ? "booking.modal.serviceCountOne" : "booking.modal.serviceCountMany", { count: visibleCatalog.length }) })
              ] }),
              hasServices ? /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setBrowseAllServices(false),
                  className: "text-[12px] font-semibold text-black underline underline-offset-2",
                  children: t("booking.modal.hideList", { count: selectedServices.length })
                }
              ) : null,
              /* @__PURE__ */ jsx(
                SalonServiceCategoryTabs,
                {
                  categories: categoryTabs,
                  selectedId: selectedCategory,
                  onSelect: setSelectedCategory,
                  size: "sm",
                  className: "-mx-1 px-1",
                  accentFill
                }
              ),
              visibleCatalog.map((service) => {
                const variants = service.variants ?? [];
                const variantLabel = variants.length > 0 ? selectedVariantByServiceId[service.id] ?? variants[0].label : null;
                const active = isCatalogServiceSelected(
                  selectedServiceIdxs,
                  services,
                  service,
                  variantLabel
                );
                const { price, duration } = getCatalogDisplayPriceDuration(service, variantLabel);
                return /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `rounded-2xl transition ${active ? `p-px ${gradientRingShadow}` : `bg-white ${cardShadow}`}`,
                    style: active ? accentBorderStyle : void 0,
                    children: /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: `flex items-start justify-between gap-3 ${active ? "rounded-[15px] bg-white px-3.5 py-3.5" : "px-3.5 py-3.5"}`,
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                            /* @__PURE__ */ jsx("p", { className: "truncate text-[16px] font-semibold text-black", children: service.name }),
                            /* @__PURE__ */ jsx(ServiceDescription, { text: service.description }),
                            variants.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "relative mt-1.5 max-w-full", children: [
                              /* @__PURE__ */ jsxs(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => setVariantDropdownOpenForServiceId(
                                    (prev) => prev === service.id ? null : service.id
                                  ),
                                  className: "flex w-full items-center justify-between rounded-full border border-black/12 bg-white px-3 py-1.5 text-left text-xs transition hover:border-black/25",
                                  children: [
                                    /* @__PURE__ */ jsx("span", { className: "truncate", children: variantLabel }),
                                    /* @__PURE__ */ jsx(ChevronDown, { className: "ml-1 h-3.5 w-3.5 shrink-0 text-black/45", "aria-hidden": true })
                                  ]
                                }
                              ),
                              variantDropdownOpenForServiceId === service.id ? /* @__PURE__ */ jsx("div", { className: "absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]", children: variants.map((variant) => /* @__PURE__ */ jsxs(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => {
                                    setSelectedVariantByServiceId((prev) => ({
                                      ...prev,
                                      [service.id]: variant.label
                                    }));
                                    setVariantDropdownOpenForServiceId(null);
                                  },
                                  className: `w-full px-3 py-2 text-left text-xs hover:bg-black/[0.04] ${variantLabel === variant.label ? "font-semibold text-black" : "text-black/70"}`,
                                  children: [
                                    variant.label,
                                    " \xB7 ",
                                    fmtPrice(Number(variant.price) || 0)
                                  ]
                                },
                                variant.label
                              )) }) : null
                            ] }) : null,
                            /* @__PURE__ */ jsxs("p", { className: "mt-1.5 text-[13px] tabular-nums text-black/45", children: [
                              duration,
                              " ",
                              t("booking.modal.minSuffix"),
                              " \xB7 ",
                              fmtPrice(Number(price) || 0)
                            ] })
                          ] }),
                          active ? /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => toggleCatalogService(service),
                              className: `mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full border border-black/10 bg-white px-2.5 py-1.5 text-xs font-semibold text-black/60 transition active:bg-black/[0.04] ${cardShadow}`,
                              "aria-label": t("booking.modal.removeAria"),
                              children: [
                                /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5", "aria-hidden": true }),
                                t("booking.modal.remove")
                              ]
                            }
                          ) : /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => toggleCatalogService(service),
                              className: `mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-semibold text-white transition ${gradientCtaShadow}`,
                              style: accentFillStyle,
                              children: [
                                /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5", "aria-hidden": true }),
                                t("booking.modal.add")
                              ]
                            }
                          )
                        ]
                      }
                    )
                  },
                  service.id
                );
              }),
              visibleCatalog.length === 0 ? /* @__PURE__ */ jsx("p", { className: `rounded-2xl bg-white px-3.5 py-3 text-sm text-black/40 ${cardShadow}`, children: t("booking.modal.noServicesInCategory") }) : null
            ] }) }) : null,
            step === 2 && isTeam ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold text-black", children: t("booking.modal.selectSpecialist") }),
              selectedServiceIds.length > 0 && /* @__PURE__ */ jsxs("p", { className: "text-[12px] text-black/45", children: [
                t("booking.modal.availableFor"),
                "\xA0",
                /* @__PURE__ */ jsx("span", { className: "font-medium text-black/70", children: selectedServiceIds.map((sid) => serviceCatalog.find((s) => s.id === sid)?.name ?? sid).join(" + ") })
              ] }),
              eligibleStaff.length === 0 ? /* @__PURE__ */ jsxs("div", { className: `rounded-2xl bg-white px-4 py-5 text-center ${cardShadow}`, children: [
                /* @__PURE__ */ jsx("p", { className: "text-[14px] font-medium text-black/50", children: t("booking.modal.serviceUnavailable") }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep(1),
                    className: "mt-3 text-[13px] font-semibold text-[color:var(--salon-primary)] underline underline-offset-2",
                    children: t("booking.modal.selectOtherService")
                  }
                )
              ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-2.5", children: eligibleStaff.map((sm) => {
                const selected = selectedStaffMemberId === sm.id;
                return /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => onStaffMemberChange?.(sm.id),
                    className: `flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition ${selected ? `p-px ${gradientRingShadow}` : `bg-white ${cardShadow}`}`,
                    style: selected ? accentBorderStyle : void 0,
                    children: [
                      selected ? /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white", style: accentFillStyle, children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4", "aria-hidden": true }) }) : /* @__PURE__ */ jsx("div", { className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black/30 ${cardShadow}`, children: /* @__PURE__ */ jsx(User, { className: "h-4 w-4", "aria-hidden": true }) }),
                      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ jsx("p", { className: "text-[15px] font-semibold text-black", children: sm.name }),
                        sm.bio && /* @__PURE__ */ jsx("p", { className: "mt-0.5 truncate text-[12px] text-black/45", children: sm.bio })
                      ] })
                    ]
                  },
                  sm.id
                );
              }) })
            ] }) : null,
            isTeam && step === 3 || !isTeam && step === 2 ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold text-black", children: selectedStaffMemberId ? t("booking.modal.timeWithStaff", { name: staffMembers.find((s) => s.id === selectedStaffMemberId)?.name ?? "" }) : t("booking.modal.dateTime") }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStep(1),
                    className: `inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[color:var(--salon-primary)] ${cardShadow} active:bg-black/[0.03]`,
                    children: [
                      /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }),
                      t("booking.modal.addService")
                    ]
                  }
                )
              ] }),
              hasServices ? /* @__PURE__ */ jsx("p", { className: "text-[15px] font-semibold text-black", children: selectedServices.map((s) => s.name).join(" + ") }) : null,
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-semibold text-black", children: t("booking.modal.date") }),
                /* @__PURE__ */ jsx("div", { className: "-mx-1 mt-2 flex gap-2.5 overflow-x-auto px-1 pb-1.5 scrollbar-none", children: dateOptions.map((d) => {
                  const active = selectedDate === d.iso;
                  return /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => onDateChange(d.iso),
                      className: `flex h-[4.25rem] w-[4.25rem] shrink-0 flex-col items-center justify-center rounded-2xl text-center transition ${active ? "text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)]" : "border border-black/[0.06] bg-white text-black/60 shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)]"}`,
                      style: active ? { backgroundColor: "#000" } : void 0,
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium uppercase leading-none tabular-nums opacity-75", children: d.weekday }),
                        /* @__PURE__ */ jsx("span", { className: "mt-1 text-[12px] font-bold leading-tight tabular-nums", children: d.day })
                      ]
                    },
                    d.iso
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-semibold text-black", children: t("booking.modal.time") }),
                !selectedDate ? /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-black/35", children: t("booking.modal.selectDateFirst") }) : timeSlots === "closed" ? /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-black/35", children: t("booking.modal.dayClosed") }) : Array.isArray(timeSlots) && timeSlots.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-black/35", children: t("booking.modal.noSlots") }) : Array.isArray(timeSlots) ? /* @__PURE__ */ jsx("div", { className: "mt-2 grid w-full max-w-full grid-cols-3 gap-2.5 sm:grid-cols-4", children: timeSlots.map((t2) => {
                  const active = selectedTime === t2;
                  return /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => onTimeChange(t2),
                      className: `min-w-0 touch-manipulation rounded-2xl px-2 py-3 text-center text-[14px] font-semibold tabular-nums transition ${active ? "text-white shadow-[0_4px_14px_rgba(0,0,0,0.22)]" : "border border-black/[0.08] bg-white text-black shadow-[0_2px_8px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] active:bg-black/[0.03] active:shadow-[0_1px_2px_rgba(0,0,0,0.10)]"}`,
                      style: active ? { backgroundColor: "#000" } : void 0,
                      children: t2
                    },
                    t2
                  );
                }) }) : /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-black/35", children: t("booking.modal.selectServiceFirst") })
              ] })
            ] }) : null,
            isTeam && step === 4 || !isTeam && step === 3 ? /* @__PURE__ */ jsxs("div", { className: "space-y-3.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[13px] font-semibold text-black", children: t("booking.modal.contactDetails") }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-semibold text-black", children: t("booking.modal.name") }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: fieldClass,
                    value: clientName,
                    onChange: (e) => onClientNameChange(e.target.value),
                    autoComplete: "name",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-semibold text-black", children: t("booking.modal.phone") }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "tel",
                    className: fieldClass,
                    value: clientPhone,
                    onChange: (e) => onClientPhoneChange(e.target.value),
                    autoComplete: "tel",
                    inputMode: "tel",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-semibold text-black", children: t("booking.modal.email") }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    inputMode: "email",
                    autoComplete: "email",
                    className: fieldClass,
                    value: clientEmail,
                    onChange: (e) => onClientEmailChange(e.target.value),
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("label", { className: "block text-[13px] font-semibold text-black", children: t("booking.modal.notes") }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    className: `${fieldClass} resize-none`,
                    rows: 2,
                    value: notes,
                    onChange: (e) => onNotesChange(e.target.value)
                  }
                )
              ] })
            ] }) : null,
            bookingError ? /* @__PURE__ */ jsx("p", { className: "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700", role: "alert", children: bookingError }) : null
          ] }) }),
          !bookingSuccess && !bookingSuccessDetails ? /* @__PURE__ */ jsxs("div", { className: "relative z-[2] shrink-0 border-t border-black/[0.06] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-5", children: [
            hasServices ? /* @__PURE__ */ jsxs("div", { className: "mb-3 px-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[13px] tabular-nums text-black/50", children: t("booking.modal.totalDuration", { min: Math.max(0, totalDuration) }) }),
              /* @__PURE__ */ jsx("p", { className: "text-[17px] font-semibold tabular-nums text-black/70 leading-tight", children: t("booking.modal.totalPrice", { price: fmtPrice(totalPrice) }) }),
              selectedTime ? /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-[13px] font-semibold tabular-nums text-black", children: t("booking.modal.startTime", { start: selectedTime, end: endTime }) }) : step > 1 ? /* @__PURE__ */ jsx("p", { className: "mt-0.5 truncate text-[13px] font-semibold text-black", children: selectedServices.map((s) => s.name).join(" + ") }) : null
            ] }) : null,
            step === 3 && paymentType !== "none" && /* @__PURE__ */ jsxs("div", { className: "mb-2.5 space-y-1 text-center", children: [
              /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#635BFF]", children: [
                /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 60 60", fill: "none", "aria-hidden": true, children: [
                  /* @__PURE__ */ jsx("rect", { width: "60", height: "60", rx: "8", fill: "#635BFF" }),
                  /* @__PURE__ */ jsx("path", { d: "M27.5 22.5c0-1.7 1.4-2.4 3.6-2.4 3.2 0 7.3 1 10.4 2.7v-9.8c-3.5-1.4-7-2-10.4-2C23.1 11 18 15.2 18 22.9c0 12.1 16.6 10.2 16.6 15.4 0 2-1.7 2.7-4.1 2.7-3.5 0-8-1.5-11.5-3.5v9.9c3.9 1.7 7.9 2.4 11.5 2.4 8.8 0 14.8-4.3 14.8-12.2C45.3 25.4 27.5 27.6 27.5 22.5z", fill: "white" })
                ] }),
                paymentType === "deposit" && depositAmount && depositAmount > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  t("booking.modal.depositRequired"),
                  " ",
                  /* @__PURE__ */ jsx("strong", { className: "mx-0.5", children: fmtPrice(Number(depositAmount) || 0) })
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  t("booking.modal.paymentFrom"),
                  " ",
                  /* @__PURE__ */ jsx("strong", { className: "mx-0.5", children: fmtPrice(totalPrice) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-black/35", children: [
                t("booking.modal.securePayment"),
                " ",
                /* @__PURE__ */ jsx("span", { className: "font-bold text-[#635BFF]", children: "Stripe" })
              ] }),
              cancelPolicyHours ? /* @__PURE__ */ jsx("p", { className: "mx-auto max-w-[320px] text-[11px] leading-relaxed text-black/45", children: formatPolicySummary({
                cancelPolicyHours,
                cancelPolicyAction: cancelPolicyAction ?? "keep_deposit",
                depositAmountEuros: depositAmount
              }) }) : null
            ] }),
            (() => {
              const maxStep = isTeam ? 4 : 3;
              const isLastStep = step === maxStep;
              const nextDisabled = step === 1 && !hasServices || isTeam && step === 2 && (!selectedStaffMemberId || eligibleStaff.length === 0) || (isTeam ? step === 3 : step === 2) && (!selectedDate || !selectedTime);
              return /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setStep((s) => s > 1 ? s - 1 : s),
                      disabled: step === 1,
                      className: "rounded-full border border-black/10 bg-white py-2.5 text-[14px] font-medium text-black/60 transition disabled:opacity-25 active:scale-[0.98]",
                      children: t("booking.modal.back")
                    }
                  ),
                  !isLastStep ? /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        if (!nextDisabled) setStep((s) => s < maxStep ? s + 1 : s);
                      },
                      disabled: nextDisabled,
                      className: `rounded-full py-3.5 text-[15px] font-semibold text-white transition disabled:opacity-40 ${gradientCtaShadow}`,
                      style: accentFillStyle,
                      children: t("booking.modal.continue")
                    }
                  ) : /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "submit",
                      form: "salon-booking-form",
                      disabled: isSubmitting || !selectedTime || !hasServices,
                      className: `flex items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-semibold text-white transition disabled:opacity-40 ${gradientCtaShadow}`,
                      style: accentFillStyle,
                      children: [
                        isSubmitting ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin", "aria-hidden": true }) : null,
                        paymentType !== "none" ? t("booking.modal.payAndBook") : t("booking.modal.sendRequest")
                      ]
                    }
                  )
                ] }),
                isLastStep ? /* @__PURE__ */ jsxs("p", { className: "mt-2.5 text-center text-[10.5px] leading-snug text-black/35", children: [
                  t("booking.modal.disclaimerPre"),
                  " ",
                  t("booking.modal.disclaimerAccept"),
                  " ",
                  /* @__PURE__ */ jsx("a", { href: termsHref, target: "_blank", rel: "noopener noreferrer", className: "underline underline-offset-2", children: t("booking.modal.terms") }),
                  " ",
                  t("booking.modal.smsConsentAnd"),
                  " ",
                  /* @__PURE__ */ jsx("a", { href: privacyHref, target: "_blank", rel: "noopener noreferrer", className: "underline underline-offset-2", children: t("booking.modal.privacy") }),
                  "."
                ] }) : null
              ] });
            })()
          ] }) : null
        ]
      }
    )
  ] });
}

export { SalonBookingModal };
//# sourceMappingURL=SalonBookingModal-N4LE7UCQ.js.map
//# sourceMappingURL=SalonBookingModal-N4LE7UCQ.js.map