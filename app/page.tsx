"use client";
import { useMemo } from "react";
import { ipos } from "@/data/ipos";
import { gradeAll, type ScoredIPO, type Grade, GRADE_COLORS } from "@/data/grading";
import { currentPrices } from "@/data/prices";
import Nav from "@/components/Nav";
import CountUp from "@/components/CountUp";
import GradeBadge from "@/components/GradeBadge";
import GradeDistribution from "@/components/GradeDistribution";
import Leaderboard from "@/components/Leaderboard";
import TickerTape from "@/components/TickerTape";
import VintageReport from "@/components/VintageReport";
import IPOScatterChart from "@/components/ScatterChart";
import SectorBreakdown from "@/components/SectorBreakdown";
import WinnersLosers from "@/components/WinnersLosers";
import Methodology from "@/components/Methodology";
import Reveal from "@/components/Reveal";
import { ExternalLink } from "lucide-react";

function avgGradeLetter(scored: ScoredIPO[]): { grade: Grade; avg: number } {
  const avg = scored.reduce((s, i) => s + i.gradeBreakdown.total, 0) / scored.length;
  let grade: Grade = "F";
  if (avg >= 90) grade = "A+";
  else if (avg >= 80) grade = "A";
  else if (avg >= 70) grade = "B";
  else if (avg >= 60) grade = "C";
  else if (avg >= 50) grade = "D";
  return { grade, avg };
}

export default function Home() {
  const scored = useMemo(() => gradeAll(ipos, currentPrices), []);
  const aboveIPO = scored.filter((i) => i.priceReturnPct > 0).length;
  const abovePct = (aboveIPO / scored.length) * 100;
  const { grade: classGrade, avg: classAvg } = avgGradeLetter(scored);
  const best = scored[0];

  return (
    <>
      <Nav />

      {/* Ticker tape */}
      <div className="pt-14">
        <TickerTape ipos={scored} />
      </div>

      {/* Hero */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <div className="mesh-bg">
          <div className="mesh-blob-3" />
        </div>
        <div className="grid-pattern absolute inset-0 z-[1]" />
        <div className="noise-overlay absolute inset-0 z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/15 rounded-full px-3 py-1 text-xs font-medium text-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              Live data — {scored.length} IPOs tracked
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
            Tech IPO Scorecard
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mb-10">
            Every major tech IPO from 2021–2026, graded on price performance, revenue growth, and
            profitability. No spin — just the numbers.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "IPOs Tracked",
                value: <CountUp end={scored.length} />,
                sub: "2021–2026",
              },
              {
                label: "Class Average",
                value: (
                  <span className="flex items-center gap-2">
                    <GradeBadge grade={classGrade} size="lg" />
                    <span className="text-white/60 text-lg font-mono">
                      {classAvg.toFixed(0)}/100
                    </span>
                  </span>
                ),
                sub: "Composite score",
              },
              {
                label: "Above IPO Price",
                value: (
                  <CountUp end={abovePct} suffix="%" decimals={0} />
                ),
                sub: `${aboveIPO} of ${scored.length} companies`,
              },
              {
                label: "Top Performer",
                value: (
                  <span className="text-cyan-300 font-mono">
                    {best.ticker}
                  </span>
                ),
                sub: `+${best.priceReturnPct.toFixed(0)}% return`,
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="glass rounded-xl p-4 sm:p-5 stagger-card"
                style={{ animationDelay: `${300 + i * 80}ms` }}
              >
                <p className="text-xs text-blue-200 font-medium mb-2 uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-blue-200/70">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <GradeDistribution ipos={scored} />
        <VintageReport ipos={scored} />
        <Leaderboard ipos={scored} />
        <IPOScatterChart ipos={scored} />
        <SectorBreakdown ipos={scored} />
        <WinnersLosers ipos={scored} />
        <Methodology />

        {/* Closing manifesto */}
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
            <div className="grid-pattern absolute inset-0 opacity-40" />
            <div className="noise-overlay absolute inset-0" />
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-semibold mb-4">
                Value Add VC
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 max-w-xl mx-auto">
                The market doesn&apos;t grade on a curve. Neither do we.
              </h2>
              <p className="text-blue-100 text-sm sm:text-base max-w-lg mx-auto mb-6">
                Grades update as prices move and earnings drop. Bookmark this page — it&apos;s a
                living document, not a snapshot.
              </p>
              <p className="text-blue-200/60 text-xs font-mono">
                Built by Trace Cohen — @Trace_Cohen
              </p>
            </div>
          </div>
        </Reveal>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-slate-200 space-y-2">
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <a
              href="https://x.com/Trace_Cohen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 flex items-center gap-1 active:scale-[0.97]"
            >
              Twitter
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href="mailto:t@nyvp.com"
              className="hover:text-slate-900 active:scale-[0.97]"
            >
              t@nyvp.com
            </a>
          </div>
          <p className="text-xs text-slate-400">
            Prices are delayed and may not reflect real-time values. Not financial advice.
          </p>
        </footer>
      </main>
    </>
  );
}
