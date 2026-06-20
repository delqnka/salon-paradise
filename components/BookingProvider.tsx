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
          locale="bg-BG"
          formatPrice={(amount) => `${amount.toFixed(amount % 1 === 0 ? 0 : 2)} лв.`}
        />
      ) : null}
    </BookingContext.Provider>
  );
}
