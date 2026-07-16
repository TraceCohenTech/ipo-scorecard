import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech IPO Scorecard 2021–2026 — Value Add VC",
  description:
    "Live report card grading every major tech IPO from 2021-2026. Letter grades based on price performance, revenue growth, and profitability.",
  openGraph: {
    title: "Tech IPO Scorecard 2021–2026",
    description: "Live grades for 70+ tech IPOs. How is your favorite stock doing?",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
