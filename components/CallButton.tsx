"use client";

import { motion } from "motion/react";
import theme from "@/theme.config";

export default function CallButton() {
  const phone = theme.salon.phone;
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <motion.a
      href={telHref}
      aria-label={`Обади се на ${phone}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white"
      style={{
        bottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))",
        background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        boxShadow:
          "0 10px 25px -5px rgba(34,197,94,0.55), 0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(34,197,94,0.55)",
          animation: "call-ping 2s ease-out infinite",
        }}
      />
      <svg
        className="relative w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </motion.a>
  );
}
