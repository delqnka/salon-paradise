const CLICKA_API = process.env.NEXT_PUBLIC_CLICKA_API_URL || "https://www.clicka.bg";
const SALON_SLUG = process.env.NEXT_PUBLIC_SALON_SLUG || "koketna";

export type ClickaService = {
  id?: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  duration_min: number;
  images?: string[];
};

export type ClickaSalon = {
  id: string;
  slug: string;
  name: string;
  category?: string;
  phone: string;
  email: string;
  city?: string;
  address: string;
  about?: string;
  cover_image_url?: string;
  logo_image_url?: string;
  gallery_images?: string[];
  instagram_username?: string;
  facebook_username?: string;
  working_hours?: Record<string, { open?: string; close?: string; closed?: boolean }>;
  services?: ClickaService[];
  primary_color?: string;
  primary_color_light?: string;
  rating?: number;
  review_count?: number;
};

export async function fetchSalon(): Promise<ClickaSalon | null> {
  try {
    const res = await fetch(`${CLICKA_API}/api/salons/${SALON_SLUG}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ClickaSalon;
  } catch {
    return null;
  }
}

export function bookingUrl() {
  return `${CLICKA_API}/${SALON_SLUG}`;
}

export type OccupiedSlot = { time: string; duration: number };

export async function fetchOccupiedSlots(date: string): Promise<OccupiedSlot[]> {
  try {
    const res = await fetch(
      `${CLICKA_API}/api/bookings?public=1&date=${date}&slug=${SALON_SLUG}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { occupied?: OccupiedSlot[] };
    return data.occupied || [];
  } catch {
    return [];
  }
}

export type CreateBookingInput = {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  date: string;
  time: string;
  notes?: string;
};

export async function createBooking(
  input: CreateBookingInput
): Promise<{ ok: true; bookingId?: string } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${CLICKA_API}/api/bookings?slug=${SALON_SLUG}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: data.error || "Грешка при резервацията" };
    }
    return { ok: true, bookingId: data.bookingId };
  } catch (e) {
    return { ok: false, error: "Мрежова грешка. Опитайте отново." };
  }
}

export function generateTimeSlots(
  workingHours: ClickaSalon["working_hours"] | undefined,
  date: string,
  durationMin: number,
  occupied: OccupiedSlot[],
  intervalMin = 30
): string[] {
  if (!workingHours) return [];
  const dayKeys = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;
  const d = new Date(`${date}T12:00:00`);
  const dayKey = dayKeys[d.getDay()];
  const day = workingHours[dayKey];
  if (!day || day.closed || !day.open || !day.close) return [];

  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  const openMin = toMin(day.open);
  const closeMin = toMin(day.close);

  const occupiedRanges = occupied.map((o) => {
    const start = toMin(o.time);
    return { start, end: start + Math.max(5, o.duration) };
  });

  const slots: string[] = [];
  for (let t = openMin; t + durationMin <= closeMin; t += intervalMin) {
    const slotEnd = t + durationMin;
    const overlaps = occupiedRanges.some((r) => t < r.end && slotEnd > r.start);
    if (overlaps) continue;
    const hh = String(Math.floor(t / 60)).padStart(2, "0");
    const mm = String(t % 60).padStart(2, "0");
    slots.push(`${hh}:${mm}`);
  }
  return slots;
}

export function formatPrice(price: number): string {
  return `${price.toFixed(price % 1 === 0 ? 0 : 2)} €`;
}

export function formatDuration(min: number): string {
  if (min < 60) return `${min} мин`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (m === 0) return h === 1 ? "1 час" : `${h} часа`;
  return `${h}ч ${m}мин`;
}
