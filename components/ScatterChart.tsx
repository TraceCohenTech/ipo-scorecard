"use client";
import {
  ScatterChart as RechartsScatter,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell,
  ReferenceLine,
  ReferenceArea,
} from "recharts";
import { type ScoredIPO, GRADE_COLORS } from "@/data/grading";
import Reveal from "./Reveal";

export default function IPOScatterChart({ ipos }: { ipos: ScoredIPO[] }) {
  const data = ipos.map((ipo) => ({
    name: ipo.name,
    ticker: ipo.ticker,
    x: Math.min(Math.max(ipo.revenueGrowthPct, -100), 800),
    y: Math.min(Math.max(ipo.priceReturnPct, -100), 300),
    z: Math.max(ipo.latestRevenue, 100),
    grade: ipo.gradeBreakdown.grade,
    color: GRADE_COLORS[ipo.gradeBreakdown.grade],
  }));

  return (
    <Reveal>
      <div id="scatter" className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
          The Money Chart
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-1">
          Revenue growth vs. price return
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Bubble size = latest annual revenue. Color = letter grade. Top-right is where you want to
          live: the business grew <em>and</em> the market paid you for it. Bottom-right is the trap
          — revenue up, stock down, valuation sins still being digested.
        </p>

        <div className="h-[400px] sm:h-[500px]" role="img" aria-label="Scatter chart showing revenue growth versus price return for tech IPOs, colored by grade">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatter data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
              <ReferenceArea
                x1={0}
                x2={800}
                y1={0}
                y2={300}
                fill="#10b981"
                fillOpacity={0.04}
              />
              <ReferenceArea
                x1={0}
                x2={800}
                y1={-100}
                y2={0}
                fill="#ef4444"
                fillOpacity={0.03}
              />
              <ReferenceLine
                x={0}
                stroke="#94a3b8"
                strokeWidth={1.5}
              />
              <ReferenceLine
                y={0}
                stroke="#94a3b8"
                strokeWidth={1.5}
                label={{
                  value: "IPO price",
                  position: "insideTopRight",
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />
              <ReferenceLine
                y={295}
                stroke="none"
                label={{
                  value: "COMPOUNDERS ↗",
                  position: "insideTopRight",
                  fill: "#059669",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              />
              <ReferenceLine
                y={-95}
                stroke="none"
                label={{
                  value: "GROWTH TRAPS ↘ (revenue up, stock down)",
                  position: "insideBottomRight",
                  fill: "#dc2626",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              />
              <XAxis
                dataKey="x"
                type="number"
                name="Revenue Growth"
                unit="%"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                label={{
                  value: "Revenue Growth %",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <YAxis
                dataKey="y"
                type="number"
                name="Price vs IPO"
                unit="%"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={{ stroke: "#cbd5e1" }}
                label={{
                  value: "Price Return %",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  fill: "#64748b",
                  fontSize: 12,
                }}
              />
              <ZAxis dataKey="z" range={[40, 400]} />
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 border-none rounded-lg px-4 py-3 text-white text-sm shadow-lg">
                      <p className="font-semibold">
                        {d.name}{" "}
                        <span className="text-slate-400 font-mono">{d.ticker}</span>
                      </p>
                      <p className="text-slate-300 mt-1">
                        Price: {d.y >= 0 ? "+" : ""}
                        {d.y.toFixed(1)}%
                      </p>
                      <p className="text-slate-300">
                        Revenue: {d.x >= 0 ? "+" : ""}
                        {d.x.toFixed(0)}%
                      </p>
                      <p className="text-slate-300">
                        Grade:{" "}
                        <span className="font-mono font-bold" style={{ color: d.color }}>
                          {d.grade}
                        </span>
                      </p>
                    </div>
                  );
                }}
              />
              <Scatter data={data}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} fillOpacity={0.75} stroke={entry.color} strokeWidth={1} />
                ))}
              </Scatter>
            </RechartsScatter>
          </ResponsiveContainer>
        </div>
      </div>
    </Reveal>
  );
}
