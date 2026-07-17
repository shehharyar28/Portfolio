import type { Metadata } from "next";
import { Geist_Mono, Orbitron, Space_Grotesk } from "next/font/google";
import { knowledge } from "@/data/knowledge";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const { about } = knowledge;

export const metadata: Metadata = {
  title: `${about.fullName} | ${about.title}`,
  description: `Portfolio of ${about.fullName} — ${about.tagline}. Ask the Portfolio Assistant anything.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${orbitron.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
