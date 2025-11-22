import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import Backdrop from "../components/Backdrop";
import HomeFab from "../components/HomeFab";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700","800","900"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Difficult Conversations",
  description: "Changing the world, one difficult conversation at a time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className={inter.className + " bg-white"}>
        <AuthProvider>
          <Backdrop />                    {/* fixed background shapes */}
          <div className="relative z-[2]">{children}</div>  {/* page content */}
          <HomeFab />                     {/* floating Home button (hidden on "/") */}
        </AuthProvider>
      </body>
    </html>
  );
}
