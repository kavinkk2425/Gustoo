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
      <body className="min-h-full flex flex-col bg-black text-white w-full max-w-full overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
