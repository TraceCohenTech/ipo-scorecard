"use client";
import { type ScoredIPO, type Grade, GRADE_COLORS } from "@/data/grading";
import Reveal from "./Reveal";

const GRADE_ORDER: Grade[] = ["A+", "A", "B", "C", "D", "F"];

export default function GradeDistribution({ ipos }: { ipos: ScoredIPO[] }) {
  const counts: Record<Grade, number> = { "A+": 0, A: 0, B: 0, C: 0, D: 0, F: 0 };
  ipos.forEach((ipo) => counts[ipo.gradeBreakdown.grade]++);
  const total = ipos.length;

  return (
    <Reveal>
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card border border-slate-100">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-2">
          Grade Distribution
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6">
          How the class stacks up
        </h2>

        <div className="flex rounded-lg overflow-hidden h-12 mb-4" role="img" aria-label="Grade distribution bar chart">
          {GRADE_ORDER.map((grade) => {
            const pct = (counts[grade] / total) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={grade}
                className="flex items-center justify-center text-white text-xs font-bold font-mono transition-all"
                style={{
                  width: `${pct}%`,
                  backgroundColor: GRADE_COLORS[grade],
                  minWidth: counts[grade] > 0 ? 32 : 0,
                }}
              >
                {grade}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-4">
          {GRADE_ORDER.map((grade) => (
            <div key={grade} className="flex items-center gap-2 text-sm text-slate-600">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: GRADE_COLORS[grade] }}
              />
              <span className="font-mono font-semibold">{grade}</span>
              <span className="text-slate-400">
                {counts[grade]} ({((counts[grade] / total) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
