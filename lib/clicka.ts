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
