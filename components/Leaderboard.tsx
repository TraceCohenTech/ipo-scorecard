"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { type ScoredIPO } from "@/data/grading";
import GradeBadge from "./GradeBadge";
import Reveal from "./Reveal";

type SortKey = "grade" | "priceReturn" | "revenueGrowth" | "name" | "ipoDate";

export default function Leaderboard({ ipos }: { ipos: ScoredIPO[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("grade");
  const [sortAsc, setSortAsc] = useState(false);
  const [sectorFilter, setSectorFilter] = useState("All");

  const sectors = ["All", ...Array.from(new Set(ipos.map((i) => i.sector))).sort()];

  const filtered = sectorFilter === "All" ? ipos : ipos.filter((i) => i.sector === sectorFilter);

  const sorted = [...filtered].sort((a, b) => {
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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Every IPO, graded
            </h2>
            <div>
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
              {sorted.map((ipo, i) => {
                const positive = ipo.priceReturnPct >= 0;
                return (
                  <tr
                    key={ipo.ticker}
                    className="border-b border-slate-50 hover:bg-blue-50/40 transition-colors"
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
                        })}
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-2 py-3 text-slate-500 font-mono text-xs">
                      {new Date(ipo.ipoDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
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
                      <GradeBadge grade={ipo.gradeBreakdown.grade} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
