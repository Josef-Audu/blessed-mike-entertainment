import { Oswald, Inter } from "next/font/google";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; // 1. Added Footer import
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Blessed Mike's Entertainment",
  description: "The ultimate arena for breaking sports news and entertainment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} scroll-smooth`}>
      {/* 2. Added flex-col and min-h-screen to control structural height */}
      <body className="font-sans antialiased bg-zinc-950 text-white min-h-screen flex flex-col">
        
        {/* Render Navbar globally across all pages */}
        <Navbar />
        
        {/* 3. Wrapped children inside flex-grow to push footer down if page content is short */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* 4. Render Footer globally at the base of every page */}
        <Footer />

      </body>
    </html>
  );
}