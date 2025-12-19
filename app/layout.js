import { CssVarsProvider } from "@mui/joy/styles";
import "./globals.css";

export const metadata = {
  title: "Launchpad - Space Launches & Expeditions",
  description: "Track upcoming space launches and expeditions",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-['Poppins',sans-serif] bg-[#222222] text-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <CssVarsProvider>{children}</CssVarsProvider>
        </div>
      </body>
    </html>
  );
}
