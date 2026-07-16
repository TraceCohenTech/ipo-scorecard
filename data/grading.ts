import { type IPOData } from "./ipos";

export type Grade = "A+" | "A" | "B" | "C" | "D" | "F";

export type GradeBreakdown = {
  priceScore: number;
  revenueScore: number;
  profitabilityScore: number;
  total: number;
  grade: Grade;
};

export type ScoredIPO = IPOData & {
  currentPrice: number;
  priceReturnPct: number;
  revenueGrowthPct: number;
  gradeBreakdown: GradeBreakdown;
};

function scorePriceReturn(returnPct: number): number {
  if (returnPct >= 100) return 35;
  if (returnPct >= 50) return 30;
  if (returnPct >= 20) return 25;
  if (returnPct >= 0) return 20;
  if (returnPct >= -20) return 15;
  if (returnPct >= -50) return 8;
  return 0;
}

function scoreRevenueGrowth(growthPct: number): number {
  if (growthPct >= 40) return 35;
  if (growthPct >= 25) return 30;
  if (growthPct >= 15) return 25;
  if (growthPct >= 5) return 18;
  if (growthPct >= 0) return 12;
  if (growthPct >= -10) return 6;
  return 0;
}

function scoreProfitability(profitable: boolean, revenueGrowthPct: number): number {
  if (profitable && revenueGrowthPct >= 20) return 30;
  if (profitable) return 25;
  if (revenueGrowthPct >= 40) return 18;
  if (revenueGrowthPct >= 15) return 12;
  if (revenueGrowthPct >= 0) return 8;
  return 0;
}

function totalToGrade(total: number): Grade {
  if (total >= 90) return "A+";
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  return "F";
}

export function gradeIPO(ipo: IPOData, currentPrice?: number): ScoredIPO {
  const price = currentPrice ?? ipo.firstDayClose;
  const priceReturnPct = ((price - ipo.offerPrice) / ipo.offerPrice) * 100;
  const revenueGrowthPct =
    ipo.revenueAtIPO > 0
      ? ((ipo.latestRevenue - ipo.revenueAtIPO) / ipo.revenueAtIPO) * 100
      : 0;

  const priceScore = scorePriceReturn(priceReturnPct);
  const revenueScore = scoreRevenueGrowth(revenueGrowthPct);
  const profitabilityScore = scoreProfitability(ipo.profitable, revenueGrowthPct);
  const total = priceScore + revenueScore + profitabilityScore;

  return {
    ...ipo,
    currentPrice: price,
    priceReturnPct,
    revenueGrowthPct,
    gradeBreakdown: {
      priceScore,
      revenueScore,
      profitabilityScore,
      total,
      grade: totalToGrade(total),
    },
  };
}

export function gradeAll(ipos: IPOData[]): ScoredIPO[] {
  return ipos.map((ipo) => gradeIPO(ipo)).sort((a, b) => b.gradeBreakdown.total - a.gradeBreakdown.total);
}

export const GRADE_COLORS: Record<Grade, string> = {
  "A+": "#10b981",
  A: "#22c55e",
  B: "#3b82f6",
  C: "#f59e0b",
  D: "#f97316",
  F: "#ef4444",
};

export const GRADE_BG: Record<Grade, string> = {
  "A+": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  A: "bg-green-500/15 text-green-400 border-green-500/30",
  B: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  C: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  D: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  F: "bg-red-500/15 text-red-400 border-red-500/30",
};
