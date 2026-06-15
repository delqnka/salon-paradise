"use client";

import { motion } from "motion/react";

const photos = [
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  "https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
  "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80",
  "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80",
  "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80",
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Портфолио</span>
          <h2 className="font-heading text-4xl font-bold text-gray-800 mb-4">
            Нашата галерия
          </h2>
          <div className="divider-ornament">
            <span>✦</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
              style={{ aspectRatio: i === 0 || i === 5 ? "1/1.3" : "1/1" }}
            >
              <img
                src={src}
                alt={`Галерия ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white text-sm font-medium tracking-wider uppercase">
                  Вижте повече
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
