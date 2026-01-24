import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalnia, Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

/* Body font */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Code / mono font */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Display / Heading font */
const kalnia = Kalnia({
  variable: "--font-kalnia",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* Poppins font - modern geometric sans-serif */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/* Playfair Display font - Trajan-style serif */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rajmudra Graphix",
  description:
    "Rajmudra Graphix — Maharashtrian-first graphic design studio crafting political, cultural, and brand visuals with impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${kalnia.variable} ${poppins.variable} ${playfair.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
