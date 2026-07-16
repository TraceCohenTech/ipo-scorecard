import { type Grade, GRADE_BG } from "@/data/grading";

export default function GradeBadge({ grade, size = "md" }: { grade: Grade; size?: "sm" | "md" | "lg" }) {
  const sizeClass = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-lg px-4 py-1.5 font-bold",
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-semibold rounded-md border ${GRADE_BG[grade]} ${sizeClass}`}
    >
      {grade}
    </span>
  );
}
