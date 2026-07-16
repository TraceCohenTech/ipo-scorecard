"use client";
import { type ScoredIPO } from "@/data/grading";

export default function TickerTape({ ipos }: { ipos: ScoredIPO[] }) {
  // Two copies back-to-back for a seamless loop
  const items = [...ipos, ...ipos];

  return (
    <div
      className="relative z-20 bg-slate-950/95 border-b border-white/10 overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="ticker-track flex items-center gap-8 py-2 whitespace-nowrap w-max">
        {items.map((ipo, i) => {
          const positive = ipo.priceReturnPct >= 0;
          return (
            <span key={`${ipo.ticker}-${i}`} className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400 font-semibold">{ipo.ticker}</span>
              <span className={positive ? "text-emerald-400" : "text-red-400"}>
                {positive ? "▲" : "▼"} {positive ? "+" : ""}
                {ipo.priceReturnPct.toFixed(1)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
