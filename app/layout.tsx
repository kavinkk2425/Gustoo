import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Caveat,
  Chakra_Petch,
  Orbitron,
  Press_Start_2P,
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
    icon: "/logos/GUSTO/gradient.png",
  },
  openGraph: {
    title: "GUSTO '26 | National Level Technical Symposium",
    description:
      "National Level Technical Symposium on March 06, 2026 at Government College of Engineering, Erode.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${chakraPetch.variable} ${orbitron.variable} ${pressStart2P.variable} dark h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-black text-white w-full max-w-full overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}

