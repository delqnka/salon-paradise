"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="gradient-bar h-1 w-full fixed top-0 left-0 z-50" />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <img
              src="/logo-2.png"
              alt="Koketna Beauty Place"
              className="h-20 w-auto object-contain drop-shadow-lg"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium tracking-wide transition-colors uppercase ${
                  scrolled ? "text-gray-600 hover:text-purple-600" : "text-white/80 hover:text-white"
                }`}
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
