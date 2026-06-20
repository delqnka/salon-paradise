"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Кристина Костадинова",
    time: "преди 4 седмици",
    text: "Силно впечатлена съм! Мило и професионално отношение! Най доброто ламиниране на мигли и вежди което съм си правила",
    rating: 5,
    avatar: "К",
  },
  {
    name: "Ирена Петкова",
    time: "преди 4 седмици",
    text: "Атмосферата е уютна, отношението е прекрасно, а резултатите винаги надминават очакванията ми. Работи супер внимателно, винаги дава съвети и резултатите са топ.",
    rating: 5,
    avatar: "И",
  },
  {
    name: "Cvetelina Ivanova",
    time: "преди седмица",
    text: "Гери ме поглези с пилинг и хидратираща терапия за лице. Беше божествено изживяване. Ароматерапия и релаксиращ масаж в едно. Поглезете се и вие или подарете това изживяване на любим човек. Препоръчвам!",
    rating: 5,
    avatar: "Ц",
    badge: "Местен гид",
  },
  {
    name: "Мила Вълчанова",
    time: "преди 3 седмици",
    text: "Много съм доволна от посещението ми при Гери! Работи внимателно и професионално, обяснява всяка стъпка и се грижи кожата да остане спокойна и чиста. Още след първата процедура кожата ми е по-гладка и свежа. Препоръчвам!",
    rating: 5,
    avatar: "М",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24" style={{ background: "#F9F4FF" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Мнения</span>
          <h2 className="font-heading text-4xl font-bold text-gray-800 mb-4">
            Какво казват клиентите
          </h2>
          <div className="divider-ornament">
            <span>✦</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <span className="text-3xl font-bold text-gray-800">4.8</span>
            <span className="text-gray-400">от 58 отзива в Google</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #9B7FD4, #EC4899)" }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                      {r.name}
                      {r.badge && (
                        <span className="text-[10px] text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full font-normal">
                          {r.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{r.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
              </div>

              <div className="flex mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">
                {r.text}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-50">
                <p className="text-xs text-gray-400 italic">
                  Отговор от собственика: Благодаря ❤️
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href="https://g.co/kgs/koketna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Вижте всички отзиви в Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
