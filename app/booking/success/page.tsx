export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f8f1fb] text-[#2b2140] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-xl p-8 text-center">
        <div className="text-sm uppercase tracking-[0.3em] text-[#9b7fd4] mb-4">Резервация</div>
        <h1 className="text-3xl font-bold mb-4">Благодарим ви</h1>
        <p className="text-[#5d5570] leading-relaxed mb-8">
          Плащането е прието успешно. Ако резервацията изискваше онлайн плащане,
          потвърждението вече е записано в Clicka Engine.
        </p>
        <a
          href="/#booking"
          className="inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #9B7FD4, #EC4899)" }}
        >
          Обратно към сайта
        </a>
      </div>
    </main>
  );
}
