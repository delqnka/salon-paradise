"use client";

import { motion } from "motion/react";

const benefits = [
  "Индивидуален подход към всеки клиент",
  "Сертифицирани козметични продукти",
  "Специализирани терапии за лечение на акне",
  "Радиочестотен лифтинг за видими резултати",
  "Незабавно потвърждение на резервацията",
  "Уютна и хигиенична среда",
];

export default function WhyUs() {
  return (
    <section className="py-24" style={{ background: "#F9F4FF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square">
              <img
                src="/gergana.webp"
                alt="Гергана — специалист красота"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl border-4 border-white p-4 text-center">
              <div className="text-yellow-400 text-sm mb-1">★★★★★</div>
              <div className="font-bold text-gray-800 text-sm">Гергана</div>
              <div className="text-xs text-purple-400">Козметик</div>
              <div className="text-xs text-gray-400 mt-1">5+ год. опит</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Защо ние</span>
            <h2 className="font-heading text-4xl font-bold text-gray-800 mb-4">
              Специални процедури
              <br />
              <span className="gradient-text">за вашата кожа</span>
            </h2>
            <div className="divider-ornament justify-start">
              <span>✦</span>
            </div>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Нашите продукти съчетават ботанически и авангардни козметични съставки
              с науката за красота, за да ви осигурят най добри резултати.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs"
                    style={{ background: "linear-gradient(135deg, #9B7FD4, #EC4899)" }}
                  >
                    ✓
                  </span>
                  {b}
                </motion.li>
              ))}
            </ul>

            <a href="#booking" className="btn-primary">
              Запишете час
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
