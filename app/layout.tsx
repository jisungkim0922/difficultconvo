import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700","800","900"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Difficult Conversations",
  description: "Changing the world, one difficult conversation at a time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
