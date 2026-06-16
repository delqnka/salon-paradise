"use client";

import { motion } from "motion/react";
import { bookingUrl, formatDuration, formatPrice, type ClickaService } from "@/lib/clicka";

const FALLBACK_IMAGES: Record<string, string> = {
  Мигли: "/ламин.jpg",
  Промо: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&q=80",
  Лице: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=80",
  "Акне терапия": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80",
  default: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
};

type DisplayService = {
  name: string;
  category: string;
  price: string;
  duration: string;
  image: string;
  sale: string | null;
  originalPrice: string | null;
};

function imageFor(s: ClickaService): string {
  if (s.images && s.images.length > 0 && s.images[0]) return s.images[0];
  return FALLBACK_IMAGES[s.category || "default"] || FALLBACK_IMAGES.default;
}

function adaptServices(raw: ClickaService[] | undefined): DisplayService[] {
  if (!raw || raw.length === 0) return [];
  return raw.map((s) => ({
    name: s.name,
    category: s.category || "Услуга",
    price: formatPrice(s.price),
    duration: formatDuration(s.duration_min),
    image: imageFor(s),
    sale: null,
    originalPrice: null,
  }));
}

export default function Services({ services: clickaServices }: { services?: ClickaService[] }) {
  const services = adaptServices(clickaServices);
  if (services.length === 0) return null;
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="section-label">Нашите</span>
          <h2 className="font-heading text-4xl font-bold text-gray-800 mb-4">
            Услуги и цени
          </h2>
          <div className="divider-ornament">
            <span>✦</span>
          </div>
          <p className="text-gray-500">
            Изберете процедурата, която отговаря на вашите нужди и се насладете на
            индивидуален подход от нашия екип.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-purple-50 group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {s.sale && (
                  <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{s.sale}
                  </span>
                )}
                <span
                  className="absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "rgba(155,127,212,0.85)" }}
                >
                  {s.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-heading text-gray-800 font-semibold text-sm leading-snug mb-3 min-h-[48px]">
                  {s.name}
                </h3>

                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-4">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {s.duration}
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xl font-bold gradient-text">{s.price}</span>
                    {s.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-1.5">
                        {s.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={bookingUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border-2 border-purple-200 text-purple-600 hover:border-transparent hover:text-white"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #9B7FD4, #EC4899)";
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "#e9d5ff";
                    (e.currentTarget as HTMLElement).style.color = "#9B7FD4";
                  }}
                >
                  Резервирай
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
