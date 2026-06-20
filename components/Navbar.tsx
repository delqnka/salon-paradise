"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import theme from "@/theme.config";

const navLinks = [
  { label: "Начало", href: "#home" },
  { label: "За нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Галерия", href: "#gallery" },
  { label: "Отзиви", href: "#testimonials" },
  { label: "Контакти", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="gradient-bar h-1 w-full fixed top-0 left-0 z-50" />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-1 left-0 right-0 z-40 bg-white shadow-md py-1.5 md:py-3"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <img
              src="/logo-2.png"
              alt="Koketna Beauty Place"
              className="h-12 md:h-20 w-auto object-contain [filter:drop-shadow(0_2px_3px_rgba(168,85,247,0.45))_drop-shadow(0_4px_10px_rgba(236,72,153,0.35))_drop-shadow(0_1px_0_rgba(255,255,255,0.9))]"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium tracking-wide transition-colors uppercase text-gray-600 hover:text-purple-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="star">★</span>
              <span className="font-semibold text-gray-800">{theme.salon.rating}</span>
              <span className="text-gray-400">({theme.salon.reviewCount})</span>
            </div>
            <a href="#booking" className="btn-primary text-sm py-3 px-7">
              Резервирай
            </a>
          </div>

          <button
            className="md:hidden p-2 text-purple-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <div className="w-6 h-0.5 bg-current transition-all" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-14 left-0 right-0 z-30 bg-white shadow-lg px-6 py-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-sm font-medium text-gray-600 border-b border-gray-100 hover:text-purple-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#booking" className="btn-primary mt-4 w-full text-center block">
              Резервирай
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
