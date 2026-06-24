'use client';
import { enrichServiceCategories, buildServiceCategoryTabs, normalizeLocale, I18nProvider, useT } from './chunk-CANVXBHW.js';
import { lazy, forwardRef, useMemo, createContext, useImperativeHandle, Suspense, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { jsx, jsxs } from 'react/jsx-runtime';

// ../../lib/salon-services.ts
function randomHex(bytes) {
  const buf = new Uint8Array(bytes);
  globalThis.crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
}
function pickFirstNonEmptyString(...values) {
  for (const value of values) {
    const text = String(value ?? "").trim();
    if (text) return text;
  }
  return "";
}
function isUnstableId(id) {
  return /^svc-\d/.test(id);
}
function assignUniqueServiceId(candidate, usedIds) {
  const trimmed = candidate.trim();
  if (trimmed && !isUnstableId(trimmed) && !usedIds.has(trimmed)) {
    usedIds.add(trimmed);
    return trimmed;
  }
  let id = randomHex(4);
  while (usedIds.has(id)) id = randomHex(4);
  usedIds.add(id);
  return id;
}
function parseSalonServices(raw) {
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  let items = [];
  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw && typeof raw === "object") {
    items = Object.values(raw);
  } else {
    return [];
  }
  const usedIds = /* @__PURE__ */ new Set();
  const out = [];
  items.forEach((item, index) => {
    const row = item;
    const name = pickFirstNonEmptyString(row.name, row.service_name, row.serviceName, row.title);
    if (!name) return;
    const id = assignUniqueServiceId(String(row.id ?? ""), usedIds);
    const duration = Number(row.duration ?? row.duration_min ?? row.durationMin ?? 30) || 30;
    const priceRaw = row.price ?? row.service_price ?? row.servicePrice;
    const price = priceRaw != null ? Number(priceRaw) : void 0;
    const variants = Array.isArray(row.variants) ? row.variants.map((variant) => {
      if (!variant || typeof variant !== "object") return null;
      const v = variant;
      const label = String(v.label ?? "").trim();
      if (!label) return null;
      const priceNum = Number(v.price ?? NaN);
      if (!Number.isFinite(priceNum)) return null;
      const durationNum = Number(v.duration ?? NaN);
      return {
        label,
        price: Math.max(0, priceNum),
        duration: Number.isFinite(durationNum) ? Math.max(5, Math.round(durationNum)) : void 0
      };
    }).filter((variant) => variant !== null) : void 0;
    const images = Array.isArray(row.images) ? row.images.map((image) => String(image ?? "").trim()).filter(Boolean) : void 0;
    const assignedTeamMemberIds = Array.isArray(row.assignedTeamMemberIds) ? [...new Set(row.assignedTeamMemberIds.map((id2) => String(id2 ?? "").trim()).filter(Boolean))] : void 0;
    const paymentTypeRaw = String(row.payment_type ?? "");
    const paymentType = ["none", "deposit", "full"].includes(paymentTypeRaw) ? paymentTypeRaw : void 0;
    const depositAmountRaw = Number(row.deposit_amount ?? NaN);
    const depositAmount = Number.isFinite(depositAmountRaw) ? Math.max(0, depositAmountRaw) : void 0;
    const cancelPolicyHoursRaw = Number(row.cancel_policy_hours ?? NaN);
    const cancelPolicyHours = Number.isFinite(cancelPolicyHoursRaw) && cancelPolicyHoursRaw > 0 ? cancelPolicyHoursRaw : void 0;
    const cancelPolicyActionRaw = String(row.cancel_policy_action ?? "");
    const cancelPolicyAction = ["full_refund", "keep_deposit", "keep_full"].includes(cancelPolicyActionRaw) ? cancelPolicyActionRaw : void 0;
    out.push({
      id,
      name,
      description: String(row.description ?? "").trim() || void 0,
      category: pickFirstNonEmptyString(
        row.category,
        row.category_name,
        row.categoryName,
        row.service_category,
        row.serviceCategory
      ) || void 0,
      price: price != null && Number.isFinite(price) ? price : void 0,
      duration,
      images,
      variants: variants && variants.length > 0 ? variants : void 0,
      ...assignedTeamMemberIds && assignedTeamMemberIds.length > 0 ? { assignedTeamMemberIds } : {},
      ...paymentType !== void 0 ? { payment_type: paymentType } : {},
      ...depositAmount !== void 0 ? { deposit_amount: depositAmount } : {},
      ...row.requires_confirmation === true ? { requires_confirmation: true } : {},
      ...cancelPolicyHours !== void 0 ? { cancel_policy_hours: cancelPolicyHours } : {},
      ...cancelPolicyAction !== void 0 ? { cancel_policy_action: cancelPolicyAction } : {}
    });
  });
  return out;
}

// ../../lib/salon-opening-hours.ts
var DAY_NAMES_EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var CLICKA_TO_EN = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday"
};
function mergeOpeningHours(workingHours, openingHoursOverride) {
  const out = {};
  for (const d of DAY_NAMES_EN) out[d] = null;
  const fromOverride = normalizeOpeningOverride(openingHoursOverride);
  if (fromOverride) {
    for (const d of DAY_NAMES_EN) {
      if (fromOverride[d] !== void 0) out[d] = fromOverride[d];
    }
    return out;
  }
  if (workingHours && typeof workingHours === "object") {
    for (const [k, v] of Object.entries(workingHours)) {
      const en = CLICKA_TO_EN[k.toLowerCase()];
      if (!en) continue;
      if (!v || v.closed || !v.open || !v.close) out[en] = null;
      else out[en] = { open: v.open, close: v.close };
    }
  }
  return out;
}
function normalizeOpeningOverride(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const o = raw;
  const out = {};
  let any = false;
  for (const d of DAY_NAMES_EN) {
    const v = o[d];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      const open = String(v.open ?? "");
      const close = String(v.close ?? "");
      if (open && close) {
        out[d] = { open, close };
        any = true;
      } else {
        out[d] = null;
      }
    }
  }
  return any ? out : null;
}

// ../../lib/booking-blocks.ts
function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
function isTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}
function toMinutes(value) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}
function normalizeBookingBlocks(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item;
    const date = String(row.date ?? "").trim();
    if (!isIsoDate(date)) continue;
    const allDay = row.allDay === true;
    const start = String(row.start ?? "").trim();
    const end = String(row.end ?? "").trim();
    const note = String(row.note ?? "").trim();
    if (!allDay) {
      if (!isTime(start) || !isTime(end)) continue;
      if (toMinutes(end) <= toMinutes(start)) continue;
      out.push({ date, allDay: false, start, end, ...note ? { note } : {} });
      continue;
    }
    out.push({ date, allDay: true, ...note ? { note } : {} });
  }
  out.sort((a, b) => `${a.date}-${a.start ?? ""}`.localeCompare(`${b.date}-${b.start ?? ""}`));
  return out;
}
function isDateBlockedAllDay(blocks, date) {
  return blocks.some((b) => b.date === date && b.allDay);
}
function isBlockedForStartTime(blocks, date, startTime, durationMin) {
  if (isDateBlockedAllDay(blocks, date)) return true;
  if (!isTime(startTime)) return false;
  const start = toMinutes(startTime);
  const end = start + Math.max(1, durationMin);
  for (const block of blocks) {
    if (block.date !== date || block.allDay || !block.start || !block.end) continue;
    const blockStart = toMinutes(block.start);
    const blockEnd = toMinutes(block.end);
    const overlaps = start < blockEnd && end > blockStart;
    if (overlaps) return true;
  }
  return false;
}

// ../../lib/tracking-events.ts
var BOOKING_STARTED_KEY = "tracking_booking_started";
function trackBookingStarted() {
  if (typeof sessionStorage === "undefined") return;
  if (sessionStorage.getItem(BOOKING_STARTED_KEY)) return;
  sessionStorage.setItem(BOOKING_STARTED_KEY, "1");
  window.gtag?.("event", "booking_started");
}
function trackBookingCompleted({ serviceName, value, currency = "EUR" } = {}) {
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem(BOOKING_STARTED_KEY);
  }
  const metaParams = {};
  if (value != null && value > 0) {
    metaParams.value = value;
    metaParams.currency = currency;
  }
  if (serviceName) metaParams.content_name = serviceName;
  window.fbq?.("track", "Schedule", metaParams);
  window.fbq?.("trackCustom", "BookingCompleted", { ...metaParams, service_name: serviceName });
  const ga4Params = {};
  if (value != null && value > 0) {
    ga4Params.value = value;
    ga4Params.currency = currency;
  }
  if (serviceName) ga4Params.service_name = serviceName;
  window.gtag?.("event", "booking_completed", ga4Params);
}

// ../../components/booking/useBookingFlow.ts
var DAY_KEYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function pad(n) {
  return String(n).padStart(2, "0");
}
function toLocalISODate(d) {
  return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().split("T")[0];
}
function useBookingFlow({
  slug,
  openingHours,
  bookingBlocks,
  slotIntervalMin,
  bookingAdvanceDays,
  bookingServices,
  engineUrl = "",
  successUrl,
  cancelUrl,
  locale = "bg-BG",
  onEvent
}) {
  const t = useT();
  const api = engineUrl.replace(/\/$/, "");
  const slugPath = `/api/public/v1/salons/${encodeURIComponent(slug)}`;
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceIdxs, setSelectedServiceIdxs] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [occupiedByDate, setOccupiedByDate] = useState({});
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedStaffMemberId, setSelectedStaffMemberIdState] = useState(null);
  const staffFetchedRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [bookingSuccessDetails, setBookingSuccessDetails] = useState(null);
  useEffect(() => {
    const today = /* @__PURE__ */ new Date();
    setMinDate(toLocalISODate(today));
    const max = new Date(today);
    max.setDate(today.getDate() + Math.max(1, bookingAdvanceDays));
    setMaxDate(toLocalISODate(max));
  }, [bookingAdvanceDays]);
  useEffect(() => {
    if (!bookingOpen || staffFetchedRef.current) return;
    staffFetchedRef.current = true;
    fetch(`${api}${slugPath}/staff`, { cache: "no-store" }).then((r) => r.json()).then((d) => {
      if (Array.isArray(d.staff)) setStaffMembers(d.staff);
    }).catch(() => {
    });
  }, [bookingOpen, slug]);
  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;
    const staffParam = selectedStaffMemberId ? `&staffMemberId=${encodeURIComponent(selectedStaffMemberId)}` : "";
    fetch(
      `${api}${slugPath}/slots?date=${encodeURIComponent(selectedDate)}${staffParam}`,
      { cache: "no-store" }
    ).then((r) => r.json()).then((d) => {
      if (cancelled || !Array.isArray(d.occupied)) return;
      const slots = d.occupied.map((x) => ({
        time: String(x?.time ?? ""),
        duration: Math.max(5, Number(x?.duration ?? 30) || 30)
      })).filter((x) => x.time.length >= 4);
      const cacheKey = selectedStaffMemberId ? `${selectedDate}:${selectedStaffMemberId}` : selectedDate;
      if (!cancelled) setOccupiedByDate((prev) => ({ ...prev, [cacheKey]: slots }));
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, [slug, selectedDate, selectedStaffMemberId]);
  const selectedServices = useMemo(
    () => selectedServiceIdxs.map((i) => bookingServices[i]).filter((s) => Boolean(s)),
    [selectedServiceIdxs, bookingServices]
  );
  const totalDuration = useMemo(
    () => selectedServices.reduce((sum, s) => sum + (Number(s.duration) || 0), 0),
    [selectedServices]
  );
  const totalPrice = useMemo(
    () => selectedServices.reduce((sum, s) => sum + (Number(s.price) || 0), 0),
    [selectedServices]
  );
  const slotsForDate = useCallback(
    (date, durationMin) => {
      if (!date) return null;
      const dayKey = DAY_KEYS[(/* @__PURE__ */ new Date(`${date}T12:00:00`)).getDay()];
      const h = openingHours[dayKey];
      if (!h?.open || !h?.close) return "closed";
      if (isDateBlockedAllDay(bookingBlocks, date)) return "closed";
      const dur = Math.max(5, durationMin || 30);
      const cacheKey = selectedStaffMemberId ? `${date}:${selectedStaffMemberId}` : date;
      const occupied = occupiedByDate[cacheKey] ?? [];
      const [oh = 0, om = 0] = h.open.split(":").map(Number);
      const [ch = 0, cm = 0] = h.close.split(":").map(Number);
      const start = oh * 60 + om;
      const latestStart = ch * 60 + cm - dur;
      const slots = [];
      for (let t2 = start; t2 <= latestStart; t2 += slotIntervalMin) {
        const slot = `${pad(Math.floor(t2 / 60))}:${pad(t2 % 60)}`;
        const slotEnd = t2 + dur;
        const overlaps = occupied.some(({ time, duration: d }) => {
          const [bh = 0, bm = 0] = time.split(":").map(Number);
          const existStart = bh * 60 + bm;
          const existEnd = existStart + Math.max(5, d);
          return existStart < slotEnd && existEnd > t2;
        });
        if (!overlaps && !isBlockedForStartTime(bookingBlocks, date, slot, dur)) {
          slots.push(slot);
        }
      }
      return slots;
    },
    [openingHours, bookingBlocks, occupiedByDate, selectedStaffMemberId, slotIntervalMin]
  );
  const timeSlots = useMemo(
    () => selectedServiceIdxs.length === 0 ? null : slotsForDate(selectedDate, totalDuration || 30),
    [selectedServiceIdxs.length, slotsForDate, selectedDate, totalDuration]
  );
  const open = useCallback((serviceId) => {
    setBookingError("");
    setBookingSuccess("");
    setBookingSuccessDetails(null);
    if (serviceId) {
      const idx = bookingServices.findIndex((s) => s.id === serviceId);
      setSelectedServiceIdxs(idx >= 0 ? [idx] : []);
    } else {
      setSelectedServiceIdxs([]);
    }
    setSelectedDate("");
    setSelectedTime("");
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setNotes("");
    setBookingOpen(true);
    if (onEvent) onEvent("booking_started");
    else trackBookingStarted();
  }, [bookingServices, onEvent]);
  const close = useCallback(() => {
    setBookingOpen(false);
    setBookingSuccessDetails(null);
    setSelectedStaffMemberIdState(null);
    setSelectedDate("");
    setSelectedTime("");
  }, []);
  const toggleService = useCallback((idx) => {
    setSelectedServiceIdxs((prev) => {
      const has = prev.includes(idx);
      return has ? prev.filter((x) => x !== idx) : [...prev, idx];
    });
    setSelectedTime("");
  }, []);
  const setDate = useCallback((d) => {
    setSelectedDate(d);
    setSelectedTime("");
  }, []);
  const setStaffMemberId = useCallback((id) => {
    setSelectedStaffMemberIdState(id);
    setSelectedDate("");
    setSelectedTime("");
  }, []);
  const markSlotOccupied = useCallback((date, time, duration) => {
    if (!date || !time) return;
    const dur = Math.max(5, Number(duration) || 30);
    setOccupiedByDate((prev) => {
      const day = prev[date] ?? [];
      if (day.some((s) => s.time === time)) return prev;
      return { ...prev, [date]: [...day, { time, duration: dur }] };
    });
  }, []);
  const submit = useCallback(async (e) => {
    e.preventDefault();
    setBookingError("");
    setBookingSuccess("");
    if (selectedServices.length === 0) {
      setBookingError(t("booking.errors.noService"));
      return;
    }
    if (!clientName.trim()) {
      setBookingError(t("booking.errors.noName"));
      return;
    }
    if (!clientPhone.trim()) {
      setBookingError(t("booking.errors.noPhone"));
      return;
    }
    if (!clientEmail.trim()) {
      setBookingError(t("booking.errors.noEmail"));
      return;
    }
    if (!selectedDate) {
      setBookingError(t("booking.errors.noDate"));
      return;
    }
    if (!selectedTime) {
      setBookingError(t("booking.errors.noTime"));
      return;
    }
    const serviceName = selectedServices.map((s) => s.name).join(" + ");
    const duration = totalDuration || 30;
    const firstSvc = selectedServices[0];
    const paymentType = firstSvc?.payment_type ?? "none";
    const depositAmt = firstSvc?.deposit_amount ?? 0;
    const amountEuros = paymentType === "deposit" ? depositAmt : paymentType === "full" ? totalPrice ?? 0 : 0;
    const requiresPayment = paymentType !== "none" && amountEuros > 0;
    setIsSubmitting(true);
    try {
      const res = await fetch(`${api}${slugPath}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          clientEmail: clientEmail.trim().toLowerCase(),
          serviceName,
          servicePrice: totalPrice,
          serviceDuration: duration,
          date: selectedDate,
          time: selectedTime,
          notes: notes.trim() || void 0,
          requiresPayment,
          staffMemberId: selectedStaffMemberId ?? void 0
        })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          json.error ?? (res.status === 500 ? t("booking.errors.saveFailed") : t("booking.errors.httpError", { status: res.status }))
        );
      }
      const bookingId = json.bookingId ?? json.id;
      if (requiresPayment && bookingId) {
        const payRes = await fetch(`${api}${slugPath}/booking-checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId,
            salonSlug: slug,
            serviceName,
            amountEuros,
            paymentType,
            successUrl,
            cancelUrl
          })
        });
        const payJson = await payRes.json().catch(() => ({}));
        if (!payRes.ok || !payJson.checkoutUrl) {
          throw new Error(payJson.error ?? t("booking.errors.paymentFailed"));
        }
        window.location.href = payJson.checkoutUrl;
        return;
      }
      const dateLabel = (/* @__PURE__ */ new Date(`${selectedDate}T12:00:00`)).toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long"
      });
      markSlotOccupied(selectedDate, selectedTime, duration);
      setBookingSuccessDetails({ serviceName, dateLabel, time: selectedTime });
      setBookingSuccess(`${serviceName} \u2014 ${dateLabel} ${selectedTime}`);
      const eventPayload = {
        serviceName,
        value: totalPrice > 0 ? totalPrice : void 0,
        currency: "EUR"
      };
      if (onEvent) onEvent("booking_completed", eventPayload);
      else trackBookingCompleted(eventPayload);
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : t("booking.errors.generic"));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    slug,
    selectedServices,
    clientName,
    clientPhone,
    clientEmail,
    selectedDate,
    selectedTime,
    notes,
    totalDuration,
    totalPrice,
    selectedStaffMemberId,
    markSlotOccupied,
    successUrl,
    cancelUrl,
    locale,
    onEvent
  ]);
  return {
    bookingOpen,
    open,
    close,
    selectedServiceIdxs,
    toggleService,
    totalDuration,
    totalPrice,
    selectedServices,
    selectedDate,
    setDate,
    selectedTime,
    setTime: setSelectedTime,
    timeSlots,
    minDate,
    maxDate,
    clientName,
    setClientName,
    clientPhone,
    setClientPhone,
    clientEmail,
    setClientEmail,
    notes,
    setNotes,
    staffMembers,
    selectedStaffMemberId,
    setStaffMemberId,
    isSubmitting,
    bookingError,
    bookingSuccess,
    bookingSuccessDetails,
    submit
  };
}
var SalonBookingModal = lazy(
  () => import('./SalonBookingModal-N4LE7UCQ.js').then((m) => ({ default: m.SalonBookingModal }))
);
function BookingWidgetInner({
  forwardedRef,
  slug,
  openingHours,
  bookingBlocks,
  slotIntervalMin,
  bookingAdvanceDays,
  bookingServices,
  serviceCatalog,
  categoryTabs,
  engineUrl,
  primaryColor,
  accentGradient,
  successUrl,
  cancelUrl,
  locale,
  formatPrice,
  onEvent,
  salonName,
  basePath
}) {
  const flow = useBookingFlow({
    slug,
    openingHours,
    bookingBlocks,
    slotIntervalMin,
    bookingAdvanceDays,
    bookingServices,
    engineUrl,
    successUrl,
    cancelUrl,
    locale,
    onEvent
  });
  useImperativeHandle(forwardedRef, () => ({
    open: (serviceId) => flow.open(serviceId),
    close: () => flow.close()
  }), [flow.open, flow.close]);
  const firstSelected = flow.selectedServices[0];
  return /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(
    SalonBookingModal,
    {
      open: flow.bookingOpen,
      primaryColor,
      accentGradient,
      locale,
      formatPrice,
      serviceCatalog,
      categoryTabs,
      services: bookingServices,
      selectedServiceIdxs: flow.selectedServiceIdxs,
      selectedDate: flow.selectedDate,
      selectedTime: flow.selectedTime,
      totalDuration: flow.totalDuration,
      totalPrice: flow.totalPrice,
      clientName: flow.clientName,
      clientPhone: flow.clientPhone,
      clientEmail: flow.clientEmail,
      notes: flow.notes,
      salonName,
      termsHref: `${basePath}/terms`,
      privacyHref: `${basePath}/privacy`,
      minDate: flow.minDate,
      maxDate: flow.maxDate,
      timeSlots: flow.timeSlots,
      paymentType: firstSelected?.payment_type ?? "none",
      depositAmount: firstSelected?.deposit_amount,
      cancelPolicyHours: firstSelected?.cancel_policy_hours,
      cancelPolicyAction: firstSelected?.cancel_policy_action,
      isSubmitting: flow.isSubmitting,
      bookingError: flow.bookingError,
      bookingSuccess: flow.bookingSuccess,
      bookingSuccessDetails: flow.bookingSuccessDetails,
      staffMembers: flow.staffMembers,
      selectedStaffMemberId: flow.selectedStaffMemberId,
      onClose: flow.close,
      onToggleService: flow.toggleService,
      onDateChange: flow.setDate,
      onTimeChange: flow.setTime,
      onClientNameChange: flow.setClientName,
      onClientPhoneChange: flow.setClientPhone,
      onClientEmailChange: flow.setClientEmail,
      onNotesChange: flow.setNotes,
      onStaffMemberChange: flow.setStaffMemberId,
      onSubmit: flow.submit
    }
  ) });
}
var BookingWidget = forwardRef(
  function BookingWidget2({ slug, salon, openingHours: openingHoursProp, bookingBlocks: blocksProp, basePath = "", engineUrl = "", accentGradient, successUrl, cancelUrl, locale: localeProp, formatPrice, onEvent }, ref) {
    const openingHours = useMemo(
      () => mergeOpeningHours(
        salon.working_hours,
        salon.opening_hours
      ),
      [salon.working_hours, salon.opening_hours]
    );
    const resolvedHours = openingHoursProp ?? openingHours;
    const resolvedBlocks = blocksProp ?? normalizeBookingBlocks(
      salon.opening_hours && typeof salon.opening_hours === "object" ? salon.opening_hours.booking_blocks : null
    );
    const slotIntervalMin = useMemo(() => {
      const oh = salon.opening_hours;
      if (oh && typeof oh === "object") {
        const v = Number(oh.slot_interval_min);
        if ([15, 20, 30, 45, 60].includes(v)) return v;
      }
      return 30;
    }, [salon.opening_hours]);
    const bookingAdvanceDays = useMemo(() => {
      const oh = salon.opening_hours;
      if (oh && typeof oh === "object") {
        const v = Number(oh.booking_advance_days);
        if (Number.isFinite(v) && v >= 1) return Math.round(v);
      }
      return 60;
    }, [salon.opening_hours]);
    const serviceCatalog = useMemo(
      () => enrichServiceCategories(parseSalonServices(salon.services)),
      [salon.services]
    );
    const categoryTabs = useMemo(
      () => buildServiceCategoryTabs(serviceCatalog),
      [serviceCatalog]
    );
    const bookingServices = useMemo(() => {
      const out = [];
      for (const svc of serviceCatalog) {
        const variants = Array.isArray(svc.variants) ? svc.variants : [];
        if (variants.length === 0) {
          out.push(svc);
          continue;
        }
        for (const v of variants) {
          out.push({
            ...svc,
            id: `${svc.id}::${v.label}`,
            name: `${svc.name} \u2013 ${v.label}`,
            price: Number(v.price ?? svc.price ?? 0) || 0,
            duration: Math.max(5, Number(v.duration ?? svc.duration ?? 30) || 30),
            variants: void 0
          });
        }
      }
      return out;
    }, [serviceCatalog]);
    const providerLocale = normalizeLocale(
      localeProp ?? (typeof salon.language === "string" ? salon.language : "bg")
    );
    const resolvedLocale = localeProp ?? (providerLocale === "en" ? "en-US" : "bg-BG");
    const primaryColor = typeof salon.primary_color === "string" && salon.primary_color ? salon.primary_color : "#5B21B6";
    return /* @__PURE__ */ jsx(I18nProvider, { locale: providerLocale, children: /* @__PURE__ */ jsx(
      BookingWidgetInner,
      {
        forwardedRef: ref,
        slug,
        openingHours: resolvedHours,
        bookingBlocks: resolvedBlocks,
        slotIntervalMin,
        bookingAdvanceDays,
        bookingServices,
        serviceCatalog,
        categoryTabs,
        engineUrl,
        primaryColor,
        accentGradient,
        successUrl,
        cancelUrl,
        locale: resolvedLocale,
        formatPrice,
        onEvent,
        salonName: String(salon.name ?? ""),
        basePath
      }
    ) });
  }
);
var BookingContext = createContext(null);
function readGlobalString(key) {
  if (typeof window === "undefined") return void 0;
  const v = window[key];
  return typeof v === "string" && v ? v : void 0;
}
function readMeta(name) {
  if (typeof document === "undefined") return void 0;
  return document.querySelector(`meta[name="${name}"]`)?.content || void 0;
}
function readEnv(key) {
  try {
    const p = typeof process !== "undefined" ? process : void 0;
    const v = p?.env?.[key];
    return typeof v === "string" && v ? v : void 0;
  } catch {
    return void 0;
  }
}
function resolveSlug(prop) {
  return prop || readGlobalString("__CLICKA_SALON_SLUG") || readMeta("clicka:salon") || readEnv("NEXT_PUBLIC_SALON_SLUG") || readEnv("NEXT_PUBLIC_CLICKA_SALON");
}
function resolveEngine(prop) {
  return prop || readGlobalString("__CLICKA_ENGINE_URL") || readMeta("clicka:engine") || readEnv("NEXT_PUBLIC_CLICKA_ENGINE") || readEnv("NEXT_PUBLIC_CLICKA_API_URL") || // Canonical host (with www). The bare clicka.bg returns a 308 redirect
  // which kills cross-origin fetches because the redirect response itself
  // carries no CORS headers — browsers reject the whole chain.
  "https://www.clicka.bg";
}
function resolveLocale(prop) {
  if (prop) return prop;
  if (typeof document !== "undefined") {
    const htmlLang = document.documentElement.lang?.trim();
    if (htmlLang) {
      if (htmlLang === "bg") return "bg-BG";
      if (htmlLang === "en") return "en-US";
      return htmlLang;
    }
    const bodyLang = document.body?.dataset?.lang?.trim();
    if (bodyLang) return bodyLang === "bg" ? "bg-BG" : "en-US";
  }
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return "bg-BG";
}
function defaultReturnUrl(flag) {
  if (typeof window === "undefined") return void 0;
  return `${location.origin}${location.pathname}?${flag}=1`;
}
function BookingProvider({
  children,
  salonSlug,
  engineUrl,
  locale,
  successUrl,
  cancelUrl,
  accentGradient,
  formatPrice,
  onEvent,
  basePath,
  autoTriggers = true,
  honorUrlParams = true
}) {
  const slug = useMemo(() => resolveSlug(salonSlug), [salonSlug]);
  const resolvedEngineUrl = useMemo(() => resolveEngine(engineUrl), [engineUrl]);
  const resolvedLocale = useMemo(() => resolveLocale(locale), [locale]);
  const resolvedSuccessUrl = useMemo(
    () => successUrl ?? defaultReturnUrl("booked"),
    [successUrl]
  );
  const resolvedCancelUrl = useMemo(
    () => cancelUrl ?? defaultReturnUrl("cancelled"),
    [cancelUrl]
  );
  const widgetRef = useRef(null);
  const pendingRef = useRef(void 0);
  const urlAutoOpenedRef = useRef(false);
  const [salon, setSalon] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!slug) {
      console.error(
        '[@clicka/booking] BookingProvider has no salon slug. Pass `salonSlug` or set NEXT_PUBLIC_SALON_SLUG / <meta name="clicka:salon"> / window.__CLICKA_SALON_SLUG.'
      );
      return;
    }
    let cancelled = false;
    const url = `${resolvedEngineUrl.replace(/\/$/, "")}/api/public/v1/salons/${encodeURIComponent(slug)}`;
    fetch(url, { cache: "no-store" }).then((r) => {
      if (!r.ok) throw new Error(`Salon fetch failed: HTTP ${r.status}`);
      return r.json();
    }).then((d) => {
      if (cancelled) return;
      if (!d.salon) throw new Error("Empty salon response");
      setSalon(d.salon);
      setError(null);
    }).catch((e) => {
      if (cancelled) return;
      const err = e instanceof Error ? e : new Error(String(e));
      console.error("[@clicka/booking] salon fetch failed:", err);
      setError(err);
    });
    return () => {
      cancelled = true;
    };
  }, [resolvedEngineUrl, slug]);
  const open = useCallback(
    (service) => {
      if (widgetRef.current && salon) {
        widgetRef.current.open(service || void 0);
      } else {
        pendingRef.current = service ?? null;
      }
    },
    [salon]
  );
  const close = useCallback(() => widgetRef.current?.close(), []);
  useEffect(() => {
    if (salon && widgetRef.current && pendingRef.current !== void 0) {
      const s = pendingRef.current;
      pendingRef.current = void 0;
      widgetRef.current.open(s || void 0);
    }
  }, [salon]);
  useEffect(() => {
    if (!autoTriggers || typeof document === "undefined") return;
    const SELECTOR = "[data-clicka-book],[data-book-service],[data-book]";
    const handler = (ev) => {
      const t = ev.target;
      if (!t) return;
      const trigger = t.closest(SELECTOR);
      if (!trigger) return;
      ev.preventDefault();
      const raw = trigger.getAttribute("data-clicka-book") ?? trigger.getAttribute("data-book-service") ?? trigger.getAttribute("data-book") ?? "";
      const service = raw && raw !== "true" ? raw : void 0;
      open(service);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [autoTriggers, open]);
  useEffect(() => {
    if (!honorUrlParams || !salon || urlAutoOpenedRef.current) return;
    if (typeof location === "undefined") return;
    const params = new URLSearchParams(location.search);
    const initial = params.get("service");
    if (initial || params.has("book")) {
      urlAutoOpenedRef.current = true;
      open(initial || void 0);
    }
  }, [honorUrlParams, salon, open]);
  const value = useMemo(
    () => ({ open, close, isReady: !!salon, error, salon }),
    [open, close, salon, error]
  );
  const modalNode = salon && slug ? /* @__PURE__ */ jsx(
    BookingWidget,
    {
      ref: widgetRef,
      slug,
      salon,
      engineUrl: resolvedEngineUrl,
      locale: resolvedLocale,
      successUrl: resolvedSuccessUrl,
      cancelUrl: resolvedCancelUrl,
      accentGradient,
      formatPrice,
      onEvent,
      basePath
    }
  ) : null;
  return /* @__PURE__ */ jsxs(BookingContext.Provider, { value, children: [
    children,
    modalNode && typeof document !== "undefined" ? createPortal(modalNode, document.body) : modalNode
  ] });
}
function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error(
      "[@clicka/booking] useBooking() must be called inside <BookingProvider>."
    );
  }
  return ctx;
}
var BookingButton = forwardRef(
  function BookingButton2({ service, onClick, type = "button", children, ...rest }, ref) {
    const { open } = useBooking();
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type,
        onClick: (e) => {
          onClick?.(e);
          if (!e.defaultPrevented) open(service);
        },
        ...rest,
        children
      }
    );
  }
);

export { BookingButton, BookingContext, BookingProvider, BookingWidget, useBooking };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map