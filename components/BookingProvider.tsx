"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import BookingModal from "./BookingModal";
import type { ClickaSalon, ClickaService } from "@/lib/clicka";

type BookingContextValue = {
  open: (service?: ClickaService | null) => void;
  close: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    return {
      open: () => {
        if (typeof window !== "undefined") {
          window.open("https://www.clicka.bg/koketna", "_blank");
        }
      },
      close: () => {},
    };
  }
  return ctx;
}

export function BookingProvider({
  children,
  services,
  workingHours,
}: {
  children: ReactNode;
  services: ClickaService[];
  workingHours: ClickaSalon["working_hours"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselected, setPreselected] = useState<ClickaService | null>(null);

  const open = useCallback((service?: ClickaService | null) => {
    setPreselected(service || null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ open, close }}>
      {children}
      <BookingModal
        open={isOpen}
        onClose={close}
        services={services}
        workingHours={workingHours}
        preselectedService={preselected}
      />
    </BookingContext.Provider>
  );
}
