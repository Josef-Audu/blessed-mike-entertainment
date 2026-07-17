import { Inter, Oswald } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import PageAnimate from "@/components/PageAnimate";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Blessed Mike's Entertainment",
  description: "The ultimate arena for breaking sports news and entertainment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-zinc-950 font-sans text-white antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1"><PageAnimate>{children}</PageAnimate></main>
          <Footer />
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
