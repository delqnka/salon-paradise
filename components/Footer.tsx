import theme from "@/theme.config";

export default function Footer() {
  const { salon } = theme;

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
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
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Дестинация за иновации в красотата. Индивидуален подход и внимание към детайла.
            </p>
            <div className="flex gap-3">
              {[
                { href: salon.socialLinks.facebook, label: "f" },
                { href: salon.socialLinks.instagram, label: "ig" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-xs text-gray-400 hover:border-purple-400 hover:text-purple-400 transition-colors uppercase font-bold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-5">
              Услуги
            </h4>
            <ul className="space-y-3 text-sm text-gray-500">
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
            <ul className="space-y-2 text-sm text-gray-500">
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
            <ul className="space-y-4 text-sm text-gray-500">
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
              <p className="text-xs text-gray-600">58 отзива в Google</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-600">
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
