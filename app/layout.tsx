import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koketna Beauty Place | Варна",
  description:
    "Koketna Beauty Place е дестинация за иновации в красотата. Ламиниране на мигли и вежди, терапии за лице, лечение на акне и подмладяване на кожата. Варна.",
  keywords: "beauty, spa, варна, ламиниране, мигли, вежди, козметик",
  openGraph: {
    title: "Koketna Beauty Place | Варна",
    description: "Специализирани терапии за красота и подмладяване на кожата във Варна.",
    type: "website",
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#9B7FD4",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
