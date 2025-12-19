import "./globals.css";
import { Poppins, Merriweather } from 'next/font/google';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export const metadata = {
  title: "Launchpad - Space Launches & Expeditions",
  description: "Track upcoming space launches and expeditions",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </head>
      <body className="font-poppins bg-[#222222] text-white">
        <div className="max-w-[1200px] mx-auto px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
