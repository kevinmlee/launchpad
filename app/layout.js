import { CssVarsProvider } from "@mui/joy/styles";
import "../src/index.css";
import "../src/App.css";

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
      </head>
      <body>
        <div className="app container">
          <CssVarsProvider>{children}</CssVarsProvider>
        </div>
      </body>
    </html>
  );
}
