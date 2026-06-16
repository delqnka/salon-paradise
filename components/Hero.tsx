"use client";

import { motion } from "motion/react";
import { useBooking } from "./BookingProvider";

export default function Hero() {
  const booking = useBooking();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/pr-sl.webp')" }}
      />

      {/* Premium overlay — тъмен градиент за четимост */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(110deg, rgba(20,8,50,0.92) 0%, rgba(45,27,105,0.80) 45%, rgba(155,127,212,0.45) 75%, rgba(236,72,153,0.25) 100%)",
        }}
      />

      {/* Декоративен блясък горе-дясно */}
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #EC4899 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Главен надпис */}
          <motion.h1
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 700 }}
          >
            Красота,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #C4A8E8, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              която говори
            </span>
            <br />
            сама за себе си
          </motion.h1>

          {/* Описание */}
          <motion.p
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg font-light"
          >
            Специализирани терапии за подмладяване на кожата, ламиниране на мигли и вежди
            и лечение на акне с индивидуален подход.
          </motion.p>

          {/* Рейтинг */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
            <span className="text-white font-semibold">4.8</span>
            <span className="text-white/50 text-sm">от 58 отзива в Google</span>
          </motion.div>

          {/* Бутони */}
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <button type="button" onClick={() => booking.open()} className="btn-primary text-sm">
              Запишете час
            </button>
            <a href="#services" className="btn-gradient-border">
              Нашите услуги
            </a>
          </motion.div>

          {/* Статистики */}
          <div className="flex gap-6 sm:gap-10 mt-14 pt-10 border-t border-white/20">
            {[
              { num: "58+", label: "Доволни клиенти" },
              { num: "4.8★", label: "Google рейтинг" },
              { num: "5+", label: "Години опит" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.7 + i * 0.15,
                  type: "spring",
                  stiffness: 120,
                }}
                whileHover={{ y: -4, scale: 1.08 }}
                className="flex-1"
              >
                <div
                  className="text-3xl sm:text-4xl font-extrabold mb-1.5"
                  style={{
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FDE68A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter:
                      "drop-shadow(0 2px 4px rgba(0,0,0,0.55)) drop-shadow(0 0 12px rgba(236,72,153,0.45))",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-white text-[10px] sm:text-xs tracking-wider font-semibold uppercase"
                  style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Гергана картичка */}
      <motion.div
        initial={{ opacity: 1, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hidden md:flex absolute top-28 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 items-center gap-3 border border-white/20"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-pink-300">
          <img
            src="/gergana.webp"
            alt="Гергана"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div>
          <div className="text-white text-xs font-semibold">Гергана</div>
          <div className="text-pink-300 text-[10px]">Специалист красота</div>
          <div className="text-yellow-400 text-xs mt-0.5">★★★★★</div>
        </div>
      </motion.div>

    </section>
  );
}
