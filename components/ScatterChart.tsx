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
          Bubble size = latest annual revenue. Color = letter grade.
        </p>

        <div className="h-[400px] sm:h-[500px]" role="img" aria-label="Scatter chart showing revenue growth versus price return for tech IPOs, colored by grade">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatter data={data}>
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
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
