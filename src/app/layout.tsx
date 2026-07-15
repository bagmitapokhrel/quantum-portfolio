import type { Metadata } from "next";
import "./globals.css";
import { UniverseProvider } from "@/context/UniverseContext";

// Encoded custom cyber-grid "B" favicon string
const faviconSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="#000000"/>
    <rect width="100" height="100" rx="20" fill="none" stroke="#06b6d4" stroke-width="4" opacity="0.3"/>
    <text x="50%" y="65%" 
          font-family="monospace" 
          font-size="65" 
          font-weight="bold" 
          fill="#06b6d4" 
          text-anchor="middle"
          style="drop-shadow: 0px 0px 8px rgba(6, 182, 212, 0.85);"
    >
      B
    </text>
  </svg>
`.trim();

export const metadata: Metadata = {
  title: "Bagmita Pokhrel // Digital Core Ecosystem",
  description: "Interactive Software Engineering & Web Architecture Portfolio",
  icons: {
    icon: `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        <UniverseProvider>
          {children}
        </UniverseProvider>
      </body>
    </html>
  );
}