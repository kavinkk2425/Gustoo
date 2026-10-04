import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased scroll-smooth`}
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
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Chakra+Petch:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Orbitron:wght@700;800;900&family=Press+Start+2P&family=Titan+One&family=Luckiest+Guy&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white w-full max-w-full overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
