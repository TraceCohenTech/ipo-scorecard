import { type ScoredIPO, GRADE_COLORS } from "@/data/grading";
import GradeBadge from "./GradeBadge";
import Reveal from "./Reveal";
import { Trophy, TrendingDown } from "lucide-react";

export default function WinnersLosers({ ipos }: { ipos: ScoredIPO[] }) {
  const sorted = [...ipos].sort((a, b) => b.gradeBreakdown.total - a.gradeBreakdown.total);
  const winners = sorted.slice(0, 5);
  const losers = sorted.slice(-5).reverse();

  return (
    <Reveal>
      <div id="winners-losers" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 sm:p-8 border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-white shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-emerald-600" aria-hidden="true" />
            <h3 className="text-lg font-bold text-emerald-900 tracking-tight">Top 5 — The Winners</h3>
          </div>
          <div className="space-y-3">
            {winners.map((ipo, i) => (
              <div
                key={ipo.ticker}
                className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-3 border border-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600 font-bold font-mono text-sm w-6">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{ipo.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{ipo.ticker}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600 font-mono text-sm font-semibold">
                    +{ipo.priceReturnPct.toFixed(0)}%
                  </span>
                  <GradeBadge grade={ipo.gradeBreakdown.grade} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6 sm:p-8 border border-red-200/60 bg-gradient-to-br from-red-50/80 to-white shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-500" aria-hidden="true" />
            <h3 className="text-lg font-bold text-red-900 tracking-tight">Bottom 5 — The Graveyard</h3>
          </div>
          <div className="space-y-3">
            {losers.map((ipo, i) => (
              <div
                key={ipo.ticker}
                className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-3 border border-red-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-500 font-bold font-mono text-sm w-6">{sorted.length - i}</span>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{ipo.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{ipo.ticker}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-500 font-mono text-sm font-semibold">
                    {ipo.priceReturnPct.toFixed(0)}%
                  </span>
                  <GradeBadge grade={ipo.gradeBreakdown.grade} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
