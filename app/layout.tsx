import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Figtree, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gusto26.vercel.app"
  ),
  title: "GUSTO '26 | National Level Technical Symposium | GCEE",
  description:
    "Official website for GUSTO 2K26 - National Level Technical Symposium organized by the Department of Information Technology & AIT, Government College of Engineering, Erode (Formerly IRTT).",
  icons: {
    icon: "/logos/GUSTO/gradient.png",
  },
  openGraph: {
    title: "GUSTO '26 | National Level Technical Symposium",
    description:
      "National Level Technical Symposium on October 23, 2026 at Government College of Engineering, Erode.",
    images: ["/logos/GUSTO/gradient.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${figtree.variable} ${playfair.variable} dark h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/SuperMario256.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Chakra+Petch:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Figtree:ital,wght@0,300..900;1,300..900&family=Orbitron:wght@700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Press+Start+2P&family=Titan+One&family=Luckiest+Guy&family=Unbounded:wght@200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white w-full max-w-full overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
