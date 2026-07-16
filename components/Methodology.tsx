import Reveal from "./Reveal";
import { Info } from "lucide-react";

const rows = [
  {
    component: "Price vs. IPO Price",
    weight: "35 pts",
    best: "+100%+ → 35 pts",
    worst: "-50%+ down → 0 pts",
  },
  {
    component: "Revenue Growth (YoY)",
    weight: "35 pts",
    best: "+40%+ → 35 pts",
    worst: "Negative → 0 pts",
  },
  {
    component: "Profitability",
    weight: "30 pts",
    best: "Profitable + growing → 30 pts",
    worst: "Burning cash → 0 pts",
  },
];

export default function Methodology() {
  return (
    <Reveal>
      <div id="methodology" className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-blue-600" aria-hidden="true" />
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
            Methodology
          </p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          How we grade
        </h2>
        <p className="text-slate-500 text-sm mb-6 max-w-2xl">
          Each IPO is scored on a 100-point scale across three dimensions. Price performance uses
          the offer price as the baseline. Revenue growth compares latest annual revenue to revenue
          at time of IPO. Profitability rewards companies that have reached or are approaching
          breakeven.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-3 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Component
                </th>
                <th className="py-3 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Weight
                </th>
                <th className="py-3 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Best Case
                </th>
                <th className="py-3 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Worst Case
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.component} className="border-b border-slate-50">
                  <td className="py-3 px-4 font-medium text-slate-900">{r.component}</td>
                  <td className="py-3 px-4 font-mono text-blue-600 font-semibold">{r.weight}</td>
                  <td className="py-3 px-4 text-emerald-600">{r.best}</td>
                  <td className="py-3 px-4 text-red-500">{r.worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {(
            [
              ["A+", "90–100", "bg-emerald-50 text-emerald-700 border-emerald-200"],
              ["A", "80–89", "bg-green-50 text-green-700 border-green-200"],
              ["B", "70–79", "bg-blue-50 text-blue-700 border-blue-200"],
              ["C", "60–69", "bg-amber-50 text-amber-700 border-amber-200"],
              ["D", "50–59", "bg-orange-50 text-orange-700 border-orange-200"],
              ["F", "< 50", "bg-red-50 text-red-700 border-red-200"],
            ] as const
          ).map(([grade, range, cls]) => (
            <div key={grade} className={`rounded-lg border px-3 py-2 text-center ${cls}`}>
              <div className="font-mono font-bold text-lg">{grade}</div>
              <div className="text-xs font-medium">{range}</div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
