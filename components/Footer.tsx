import theme from "@/theme.config";

export default function Footer() {
  const { salon } = theme;

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <a href="#home" className="block mb-4">
              <img
                src="/logo-2.png"
                alt="Koketna Beauty Place"
                className="h-16 w-auto object-contain brightness-0 invert opacity-80"
              />
            </a>
            <p className="text-sm text-white leading-relaxed mb-6">
              Дестинация за иновации в красотата. Индивидуален подход и внимание към детайла.
            </p>
            <div className="flex gap-3">
              <a
                href={salon.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-white hover:border-purple-400 hover:text-purple-400 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>
              <a
                href={salon.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-white hover:border-purple-400 hover:text-purple-400 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Услуги
            </h4>
            <ul className="space-y-3 text-sm text-white">
              {[
                "Ламиниране на мигли",
                "Ламиниране на вежди",
                "Почистване на лице",
                "Терапия за акне",
                "Хидратираща терапия",
                "Ботокс терапия",
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-purple-400 transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Работно време
            </h4>
            <ul className="space-y-2 text-sm text-white">
              {salon.workingHours.map((wh) => (
                <li key={wh.day} className="flex justify-between gap-4">
                  <span>{wh.day}</span>
                  <span className={wh.hours === "Затворено" ? "text-red-400" : "text-purple-300"}>
                    {wh.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Контакти
            </h4>
            <ul className="space-y-4 text-sm text-white">
              <li className="flex gap-3">
                <span className="text-purple-400 mt-0.5">📍</span>
                <span>{salon.address}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400">📞</span>
                <a href={`tel:${salon.phone}`} className="hover:text-purple-400 transition-colors">
                  {salon.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400">✉</span>
                <a href={`mailto:${salon.email}`} className="hover:text-purple-400 transition-colors">
                  {salon.email}
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-white font-semibold">4.8</span>
              </div>
              <p className="text-xs text-white/80">58 отзива в Google</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
            Намерете ни
          </h4>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: "2px solid #EC4899",
              boxShadow: "0 12px 36px -8px rgba(236,72,153,0.45)",
            }}
          >
            <iframe
              title="Карта на Koketna Beauty Place"
              src="https://www.openstreetmap.org/export/embed.html?bbox=27.9097%2C43.2091%2C27.9297%2C43.2241&layer=mapnik"
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                border: 0,
                display: "block",
                filter:
                  "hue-rotate(295deg) saturate(1.6) brightness(1.05) contrast(1.05)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(236,72,153,0.18) 0%, rgba(155,127,212,0.10) 100%)",
                mixBlendMode: "screen",
              }}
            />

            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              style={{ transform: "translate(-50%, -100%)" }}
            >
              <div
                className="px-3 py-1.5 rounded-full text-white text-xs font-bold tracking-wide whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #9B7FD4 0%, #7C3AED 100%)",
                  boxShadow: "0 6px 20px -4px rgba(124,58,237,0.6)",
                }}
              >
                {salon.shortName}
              </div>
              <svg
                width="42"
                height="54"
                viewBox="0 0 24 32"
                fill="none"
                style={{
                  filter:
                    "drop-shadow(0 0 0 #fff) drop-shadow(0 6px 12px rgba(0,0,0,0.6))",
                }}
              >
                <path
                  d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z"
                  fill="url(#pinGrad)"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="12" r="4.5" fill="#fff" />
                <defs>
                  <linearGradient id="pinGrad" x1="0" y1="0" x2="24" y2="32">
                    <stop offset="0%" stopColor="#6D28D9" />
                    <stop offset="100%" stopColor="#3B0764" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              salon.address
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-pink-400 hover:text-pink-300 transition-colors"
          >
            <span>📍</span>
            <span>{salon.address}</span>
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/80">
          <p>© 2025 {salon.name}. Всички права запазени.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="/privacy" className="hover:text-purple-400 transition-colors">Политика за поверителност</a>
            <a href="/terms" className="hover:text-purple-400 transition-colors">Общи условия</a>
            <a href="/cookies" className="hover:text-purple-400 transition-colors">Бисквитки</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Контакти</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
