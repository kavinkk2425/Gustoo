import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Caveat,
  Chakra_Petch,
  Orbitron,
  Press_Start_2P,
  Figtree,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gustoit26.com"
  ),
  title: "GUSTO '26 | National Level Technical Symposium | GCEE",
  description:
    "Official website for GUSTO 2K26 - National Level Technical Symposium organized by the Department of Information Technology & AIT, Government College of Engineering, Erode (Formerly IRTT).",
  icons: {
    icon: [
      { url: "/logos/GUSTO/gradient.png" },
      { url: "/logos/GUSTO/gradient.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/GUSTO/gradient.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logos/GUSTO/gradient.png",
    apple: "/logos/GUSTO/gradient.png",
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${chakraPetch.variable} ${orbitron.variable} ${pressStart2P.variable} ${figtree.variable} ${playfair.variable} dark h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/logos/GUSTO/gradient.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/logos/GUSTO/gradient.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logos/GUSTO/gradient.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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

      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-black text-white w-full max-w-full overflow-x-hidden relative"
      >
        {children}
      </body>
    </html>
  );
}