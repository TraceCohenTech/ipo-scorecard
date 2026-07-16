"use client";
import { type ScoredIPO, type Grade, GRADE_COLORS, GRADE_BG } from "@/data/grading";
import GradeBadge from "./GradeBadge";
import Reveal from "./Reveal";

function totalToGrade(total: number): Grade {
  if (total >= 90) return "A+";
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  return "F";
}

type Vintage = {
  year: string;
  count: number;
  avgScore: number;
  grade: Grade;
  aboveWaterPct: number;
  best: ScoredIPO;
  worst: ScoredIPO;
};

export default function VintageReport({ ipos }: { ipos: ScoredIPO[] }) {
  const byYear = new Map<string, ScoredIPO[]>();
  ipos.forEach((ipo) => {
    const year = ipo.ipoDate.slice(0, 4);
    byYear.set(year, [...(byYear.get(year) ?? []), ipo]);
  });

  const vintages: Vintage[] = Array.from(byYear.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([year, list]) => {
      const sorted = [...list].sort((a, b) => b.gradeBreakdown.total - a.gradeBreakdown.total);
      const avgScore = list.reduce((s, i) => s + i.gradeBreakdown.total, 0) / list.length;
      return {
        year,
        count: list.length,
        avgScore,
        grade: totalToGrade(avgScore),
        aboveWaterPct: (list.filter((i) => i.priceReturnPct > 0).length / list.length) * 100,
        best: sorted[0],
        worst: sorted[sorted.length - 1],
      };
    });

  return (
    <Reveal>
      <div id="vintages" className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
          Report Cards by Vintage
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-1">
          Which class year holds up?
        </h2>
        <p className="text-slate-500 text-sm mb-8">
          The year a company went public matters as much as what it built. The 2021 ZIRP class is
          still paying for its valuation sins — later vintages priced more honestly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {vintages.map((v) => (
            <div
              key={v.year}
              className="card-hover rounded-xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Class of
                  </p>
                  <p className="text-2xl font-bold text-slate-900 tracking-tight">{v.year}</p>
                </div>
                <span
                  className={`inline-flex items-center justify-center font-mono font-bold rounded-lg border text-xl px-3 py-1 ${GRADE_BG[v.grade]}`}
                >
                  {v.grade}
                </span>
              </div>

              <div className="space-y-2.5 text-sm flex-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">IPOs</span>
                  <span className="font-mono font-semibold text-slate-900">{v.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Avg score</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {v.avgScore.toFixed(0)}/100
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Above water</span>
                  <span
                    className={`font-mono font-semibold ${
                      v.aboveWaterPct >= 50 ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {v.aboveWaterPct.toFixed(0)}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${v.aboveWaterPct}%`,
                      backgroundColor: GRADE_COLORS[v.grade],
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Valedictorian</span>
                  <span className="font-mono font-semibold text-emerald-600 truncate">
                    {v.best.ticker} +{v.best.priceReturnPct.toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-400 shrink-0">Class clown</span>
                  <span className="font-mono font-semibold text-red-500 truncate">
                    {v.worst.ticker} {v.worst.priceReturnPct.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
