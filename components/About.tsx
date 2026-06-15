"use client";

import { motion } from "motion/react";

const categories = [
  {
    label: "Ламиниране",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=300&q=80",
  },
  {
    label: "Процедури лице",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=300&q=80",
  },
  {
    label: "Вежди и мигли",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=300&q=80",
  },
  {
    label: "Терапии за кожа",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80",
  },
];

export default function About() {
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
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-purple-300 transition-all duration-300" />
              </div>
              <span className="font-heading text-gray-700 font-medium text-center">
                {cat.label}
              </span>
            </motion.div>
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
    </section>
  );
}
