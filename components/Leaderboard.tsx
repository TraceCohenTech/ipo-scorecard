"use client";
import { useState, useMemo, Fragment } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight, Search, X } from "lucide-react";
import { type ScoredIPO, type Grade, GRADE_COLORS } from "@/data/grading";
import GradeBadge from "./GradeBadge";
import Reveal from "./Reveal";

type SortKey = "grade" | "priceReturn" | "revenueGrowth" | "name" | "ipoDate";

const GRADE_CHIPS: (Grade | "All")[] = ["All", "A+", "A", "B", "C", "D", "F"];

function ScoreBar({
  label,
  score,
  max,
  color,
}: {
  label: string;
  score: number;
  max: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs text-slate-500">{label}</span>
        <span className="text-xs font-mono font-semibold text-slate-700">
          {score}/{max}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(score / max) * 100}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function Leaderboard({ ipos }: { ipos: ScoredIPO[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("grade");
  const [sortAsc, setSortAsc] = useState(false);
  const [sectorFilter, setSectorFilter] = useState("All");
  const [gradeFilter, setGradeFilter] = useState<Grade | "All">("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const sectors = ["All", ...Array.from(new Set(ipos.map((i) => i.sector))).sort()];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ipos.filter((i) => {
      if (sectorFilter !== "All" && i.sector !== sectorFilter) return false;
      if (gradeFilter !== "All" && i.gradeBreakdown.grade !== gradeFilter) return false;
      if (q && !i.name.toLowerCase().includes(q) && !i.ticker.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [ipos, sectorFilter, gradeFilter, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "grade":
          cmp = b.gradeBreakdown.total - a.gradeBreakdown.total;
          break;
        case "priceReturn":
          cmp = b.priceReturnPct - a.priceReturnPct;
          break;
        case "revenueGrowth":
          cmp = b.revenueGrowthPct - a.revenueGrowthPct;
          break;
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "ipoDate":
          cmp = b.ipoDate.localeCompare(a.ipoDate);
          break;
      }
      return sortAsc ? -cmp : cmp;
    });
  }, [filtered, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortAsc ? (
      <ChevronUp className="w-3 h-3 inline ml-1" aria-hidden="true" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-1" aria-hidden="true" />
    );
  };

  return (
    <Reveal>
      <div id="leaderboard" className="bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden">
        <div className="p-6 sm:p-8 pb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
            Leaderboard
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Every IPO, graded
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Click any row for the full grade breakdown.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name or ticker…"
                  className="text-sm border border-slate-200 rounded-lg pl-9 pr-8 py-1.5 text-slate-700 bg-slate-50 w-full sm:w-56 focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
                  aria-label="Search companies"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 bg-slate-50 focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by sector"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-4" role="group" aria-label="Filter by grade">
            {GRADE_CHIPS.map((g) => {
              const active = gradeFilter === g;
              const count =
                g === "All" ? ipos.length : ipos.filter((i) => i.gradeBreakdown.grade === g).length;
              return (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  aria-pressed={active}
                  className={`text-xs font-mono font-semibold rounded-full px-3 py-1 border transition-colors ${
                    active
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {g}
                  <span className={active ? "text-slate-300 ml-1" : "text-slate-400 ml-1"}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-t border-b border-slate-100 bg-slate-50/80 text-left">
                <th className="px-6 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider w-8">
                  #
                </th>
                <th>
                  <button
                    onClick={() => toggleSort("name")}
                    className="px-2 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hover:text-slate-900 active:scale-[0.97]"
                  >
                    Company
                    <SortIcon col="name" />
                  </button>
                </th>
                <th className="hidden sm:table-cell">
                  <button
                    onClick={() => toggleSort("ipoDate")}
                    className="px-2 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hover:text-slate-900 active:scale-[0.97]"
                  >
                    IPO Date
                    <SortIcon col="ipoDate" />
                  </button>
                </th>
                <th>
                  <button
                    onClick={() => toggleSort("priceReturn")}
                    className="px-2 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hover:text-slate-900 active:scale-[0.97]"
                  >
                    vs. IPO
                    <SortIcon col="priceReturn" />
                  </button>
                </th>
                <th className="hidden md:table-cell">
                  <button
                    onClick={() => toggleSort("revenueGrowth")}
                    className="px-2 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hover:text-slate-900 active:scale-[0.97]"
                  >
                    Rev Growth
                    <SortIcon col="revenueGrowth" />
                  </button>
                </th>
                <th className="hidden lg:table-cell px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Profitable
                </th>
                <th>
                  <button
                    onClick={() => toggleSort("grade")}
                    className="px-2 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider hover:text-slate-900 active:scale-[0.97]"
                  >
                    Grade
                    <SortIcon col="grade" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400 text-sm">
                    No IPOs match those filters.
                  </td>
                </tr>
              )}
              {sorted.map((ipo, i) => {
                const positive = ipo.priceReturnPct >= 0;
                const isOpen = expanded === ipo.ticker;
                const gradeColor = GRADE_COLORS[ipo.gradeBreakdown.grade];
                return (
                  <Fragment key={ipo.ticker}>
                    <tr
                      className={`border-b border-slate-50 cursor-pointer transition-colors ${
                        isOpen ? "bg-blue-50/60" : "hover:bg-blue-50/40"
                      }`}
                      onClick={() => setExpanded(isOpen ? null : ipo.ticker)}
                      aria-expanded={isOpen}
                    >
                      <td className="px-6 py-3 text-slate-400 font-mono text-xs">{i + 1}</td>
                      <td className="px-2 py-3">
                        <div>
                          <span className="font-semibold text-slate-900">{ipo.name}</span>
                          <span className="ml-2 text-xs font-mono text-slate-400">{ipo.ticker}</span>
                        </div>
                        <div className="text-xs text-slate-400 sm:hidden">
                          {new Date(ipo.ipoDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                            timeZone: "UTC",
                          })}
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-2 py-3 text-slate-500 font-mono text-xs">
                        {new Date(ipo.ipoDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-1">
                          {positive ? (
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
                          )}
                          <span
                            className={`font-mono font-semibold text-sm ${
                              positive ? "text-emerald-600" : "text-red-500"
                            }`}
                          >
                            {positive ? "+" : ""}
                            {ipo.priceReturnPct.toFixed(1)}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          ${ipo.offerPrice} → ${ipo.currentPrice.toFixed(2)}
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-2 py-3">
                        <span
                          className={`font-mono font-semibold text-sm ${
                            ipo.revenueGrowthPct >= 0 ? "text-emerald-600" : "text-red-500"
                          }`}
                        >
                          {ipo.revenueGrowthPct >= 0 ? "+" : ""}
                          {ipo.revenueGrowthPct.toFixed(0)}%
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-4 py-3">
                        <span
                          className={`text-sm font-semibold ${
                            ipo.profitable ? "text-emerald-600" : "text-red-400"
                          }`}
                        >
                          {ipo.profitable ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <GradeBadge grade={ipo.gradeBreakdown.grade} />
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="border-b border-slate-100 bg-slate-50/70">
                        <td colSpan={7} className="px-6 py-5">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl">
                            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <ScoreBar
                                label="Price return (35 pts)"
                                score={ipo.gradeBreakdown.priceScore}
                                max={35}
                                color={gradeColor}
                              />
                              <ScoreBar
                                label="Revenue growth (35 pts)"
                                score={ipo.gradeBreakdown.revenueScore}
                                max={35}
                                color={gradeColor}
                              />
                              <ScoreBar
                                label="Profitability (30 pts)"
                                score={ipo.gradeBreakdown.profitabilityScore}
                                max={30}
                                color={gradeColor}
                              />
                            </div>
                            <div className="text-xs text-slate-500 space-y-1.5">
                              <p>
                                <span className="text-slate-400">Sector:</span>{" "}
                                <span className="font-semibold text-slate-700">{ipo.sector}</span>
                              </p>
                              <p>
                                <span className="text-slate-400">Revenue:</span>{" "}
                                <span className="font-mono text-slate-700">
                                  ${ipo.revenueAtIPO >= 1000 ? `${(ipo.revenueAtIPO / 1000).toFixed(1)}B` : `${ipo.revenueAtIPO}M`}
                                  {" → "}
                                  ${ipo.latestRevenue >= 1000 ? `${(ipo.latestRevenue / 1000).toFixed(1)}B` : `${ipo.latestRevenue}M`}
                                </span>
                              </p>
                              <p>
                                <span className="text-slate-400">Total:</span>{" "}
                                <span className="font-mono font-bold" style={{ color: gradeColor }}>
                                  {ipo.gradeBreakdown.total}/100
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
