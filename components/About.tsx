"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const categories = [
  {
    label: "Ламиниране",
    image: "/ламин.jpg",
    description:
      "Ламиниране на мигли и вежди — професионална терапия, която придава дълготраен извит и подреден вид. Включва боядисване и подхранваща ботокс терапия за здрав блясък и плътност.",
  },
  {
    label: "Процедури лице",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&q=80",
    description:
      "Дълбоко почистване, хидратация и подмладяване на кожата с професионални козметични линии. Индивидуален подход според типа кожа и нуждите ви.",
  },
  {
    label: "Вежди и мигли",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=300&q=80",
    description:
      "Оформяне, боядисване и стилизиране на вежди и мигли. Естествен резултат, който подчертава погледа ви и пасва на формата на лицето.",
  },
  {
    label: "Терапии за кожа",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80",
    description:
      "Специализирани терапии за лечение на акне, подмладяване и възстановяване на кожата. Видими резултати с професионални продукти и техники.",
  },
];

export default function About() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label">Добре дошли в</span>
          <h2 className="font-heading text-4xl font-bold text-gray-800 mb-4">
            Koketna Beauty Place
          </h2>
          <div className="divider-ornament">
            <span>✦</span>
          </div>
          <p className="text-gray-500 text-base leading-relaxed">
            Утвърден като дестинация за иновации в красотата, предлагаме специализирани
            терапии за лечение на акне и подмладяване на кожата. Акцентираме върху
            индивидуалния подход и вниманието към детайла при всяка процедура.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.label}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-4 group cursor-pointer focus:outline-none"
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-purple-300 transition-all duration-300" />
              </div>
              <span className="font-heading text-gray-700 font-medium text-center group-hover:text-purple-600 transition-colors">
                {cat.label}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="#services" className="btn-outline">
            Вижте всички услуги
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={categories[active].image}
                  alt={categories[active].label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Затвори"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center text-lg shadow-md transition-colors"
                >
                  ×
                </button>
                <h3 className="absolute bottom-4 left-5 right-5 font-heading text-2xl font-bold text-white drop-shadow-lg">
                  {categories[active].label}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  {categories[active].description}
                </p>
                <a
                  href="#services"
                  onClick={() => setActive(null)}
                  className="btn-primary w-full text-center block"
                >
                  Вижте услугите
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
