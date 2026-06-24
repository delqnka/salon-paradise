"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";
import { BookingWidget, type BookingWidgetHandle } from "@/vendor/clicka-booking/dist/index";
import "@/vendor/clicka-booking/dist/booking.css";
import type { ClickaSalon, ClickaService } from "@/lib/clicka";
import { getClickaConfig } from "@/lib/clicka";

type BookingContextValue = {
  open: (service?: ClickaService | null) => void;
  close: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function resolveBookingLocale(salon: ClickaSalon | null): string {
  const salonLanguage = typeof salon?.language === "string" ? salon.language.trim().toLowerCase() : "";
  if (salonLanguage === "en" || salonLanguage.startsWith("en-")) return "en-US";

  if (typeof document !== "undefined") {
    const htmlLang = document.documentElement.lang?.trim().toLowerCase();
    if (htmlLang === "en" || htmlLang.startsWith("en-")) return "en-US";
    if (htmlLang === "bg" || htmlLang.startsWith("bg-")) return "bg-BG";

    const bodyLang = document.body?.dataset?.lang?.trim().toLowerCase();
    if (bodyLang === "en" || bodyLang.startsWith("en-")) return "en-US";
    if (bodyLang === "bg" || bodyLang.startsWith("bg-")) return "bg-BG";
  }

  if (typeof navigator !== "undefined" && navigator.language) {
    const browserLang = navigator.language.trim().toLowerCase();
    if (browserLang === "en" || browserLang.startsWith("en-")) return "en-US";
  }

  return "bg-BG";
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    return {
      open: () => {},
      close: () => {},
    };
  }
  return ctx;
}

export function BookingProvider({
  children,
  salon,
}: {
  children: ReactNode;
  salon: ClickaSalon | null;
}) {
  const widgetRef = useRef<BookingWidgetHandle>(null);
  const { engineUrl, slug } = getClickaConfig();

  const siteOrigin = useMemo(() => {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (explicit) return explicit.replace(/\/$/, "");
    if (typeof window !== "undefined") return window.location.origin;
    return "";
  }, []);

  const contextValue = useMemo<BookingContextValue>(
    () => ({
      open: (service?: ClickaService | null) => {
        const serviceId = typeof service?.id === "string" ? service.id : undefined;
        widgetRef.current?.open(serviceId);
      },
      close: () => widgetRef.current?.close(),
    }),
    []
  );

  const successUrl = siteOrigin ? `${siteOrigin}/booking/success` : undefined;
  const cancelUrl = siteOrigin ? `${siteOrigin}/booking/cancel` : undefined;
  const bookingLocale = useMemo(() => resolveBookingLocale(salon), [salon]);

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
      {salon ? (
        <BookingWidget
          ref={widgetRef}
          slug={slug}
          salon={salon as Record<string, unknown>}
          engineUrl={engineUrl}
          successUrl={successUrl}
          cancelUrl={cancelUrl}
          locale={bookingLocale}
          formatPrice={(amount) => `${amount.toFixed(amount % 1 === 0 ? 0 : 2)} лв.`}
        />
      ) : null}
    </BookingContext.Provider>
  );
}
