import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Altius-like — IP / Execution Engine (inspired)",
  description: "Inspired landing page — blue/purple accents, animated hero, features, team, and metrics"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}