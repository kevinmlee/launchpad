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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Inline script to prevent flash of wrong theme
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('launchpad_theme');
      if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </head>
      <body className="font-poppins">
        <div className="max-w-[1200px] mx-auto px-3 sm:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
