import "./globals.css";
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: "GrowRix",
  description: "We engineer digital experiences that transform businesses and delight users.",
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head />
      <body className="min-h-screen bg-[#0B0B0B] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
