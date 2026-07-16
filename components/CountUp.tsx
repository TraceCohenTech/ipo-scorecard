"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({
  end,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1600,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fallback: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(eased * end);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          // rAF pauses in background tabs — guarantee the final value lands
          fallback = setTimeout(() => setValue(end), duration + 200);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
