import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };
export const alt = "Tech IPO Scorecard — 77 IPOs graded A+ through F";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0e1a",
          padding: "64px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "serif",
          color: "#e5e7eb",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: "0.16em", textTransform: "uppercase", color: "#94a3b8" }}>
          <span>Value Add VC &middot; Tech IPOs</span>
          <span style={{ color: "#3b82f6", fontWeight: 700 }}>2021&ndash;2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
          <span>77 Tech IPOs.</span>
          <span>
            Class Average:{" "}
            <span style={{ color: "#f59e0b", fontStyle: "italic" }}>C</span>.
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, background: "#1e293b", marginBottom: 24 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
            <span>Graded on price, revenue growth &amp; profitability</span>
            <span style={{ fontWeight: 700 }}>valueaddvc.com/ipo-scorecard</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
