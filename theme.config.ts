const theme = {
  salon: {
    name: "Koketna Beauty Place",
    shortName: "Koketna",
    tagline: "Красота с характер",
    description:
      "Koketna Beauty Place е дестинация за иновации в красотата, предлагаща специализирани терапии за лечение на акне и подмладяване на кожата. Индивидуален подход и внимание към детайла при всяка процедура.",
    phone: "+359 88 888 8888",
    email: "info@koketna.bg",
    address: "улица Генерал Колев 104, Приморски, Варна",
    city: "Варна",
    workingHours: [
      { day: "Понеделник", hours: "10:00 19:00" },
      { day: "Вторник", hours: "10:00 19:00" },
      { day: "Сряда", hours: "10:00 19:00" },
      { day: "Четвъртък", hours: "10:00 19:00" },
      { day: "Петък", hours: "10:00 19:00" },
      { day: "Събота", hours: "Затворено" },
      { day: "Неделя", hours: "10:00 17:00" },
    ],
    rating: 4.8,
    reviewCount: 58,
    googleMapsUrl: "https://maps.google.com",
    socialLinks: {
      facebook: "#",
      instagram: "#",
    },
  },
  clicka: {
    apiUrl: process.env.NEXT_PUBLIC_CLICKA_API_URL || "https://clicka.bg",
    salonSlug: process.env.NEXT_PUBLIC_SALON_SLUG || "koketna",
  },
  colors: {
    primary: "#9B7FD4",
    primaryLight: "#C4A8E8",
    accent: "#EC4899",
    background: "#FDFAFF",
    gradientFrom: "#9B7FD4",
    gradientTo: "#EC4899",
  },
};

export default theme;
