"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { type ScoredIPO, type Grade, GRADE_COLORS } from "@/data/grading";
import Reveal from "./Reveal";

const SECTOR_COLORS = [
  "#3b82f6", "#06b6d4", "#10b981", "#f59e0b", "#f97316",
  "#ef4444", "#0ea5e9", "#14b8a6", "#eab308", "#22c55e",
  "#0284c7", "#2563eb",
];

function avgGrade(total: number): Grade {
  if (total >= 90) return "A+";
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  return "F";
}

export default function SectorBreakdown({ ipos }: { ipos: ScoredIPO[] }) {
  const sectorMap = new Map<string, { total: number; count: number }>();
  ipos.forEach((ipo) => {
    const existing = sectorMap.get(ipo.sector) || { total: 0, count: 0 };
    existing.total += ipo.gradeBreakdown.total;
    existing.count += 1;
    sectorMap.set(ipo.sector, existing);
  });

  const data = Array.from(sectorMap.entries())
    .map(([sector, { total, count }], i) => ({
      sector,
      avgScore: Math.round(total / count),
      count,
      grade: avgGrade(total / count),
      color: SECTOR_COLORS[i % SECTOR_COLORS.length],
    }))
    .sort((a, b) => b.avgScore - a.avgScore);

  return (
    <Reveal>
      <div id="sectors" className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
          By Sector
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-1">
          Which sectors are winning?
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Average composite score by sector. Higher is better.
        </p>

        <div className="h-[400px]" role="img" aria-label="Bar chart showing average IPO grade by sector">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
              />
              <YAxis
                type="category"
                dataKey="sector"
                width={130}
                tick={{ fill: "#334155", fontSize: 12, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 border-none rounded-lg px-4 py-3 text-white text-sm shadow-lg">
                      <p className="font-semibold">{d.sector}</p>
                      <p className="text-slate-300 mt-1">
                        Avg Score: {d.avgScore}/100 (
                        <span style={{ color: GRADE_COLORS[d.grade as Grade] }}>{d.grade}</span>)
                      </p>
                      <p className="text-slate-300">{d.count} IPOs</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="avgScore" radius={[0, 6, 6, 0]} barSize={24}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Reveal>
  );
}
