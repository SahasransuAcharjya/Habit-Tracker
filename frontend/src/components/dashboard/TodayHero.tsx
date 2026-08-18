"use client";

import Link from "next/link";
import { useMemo, useEffect, useRef, useState } from "react";

type TodayHeroProps = {
  completedCount?: number;
  pendingCount?: number;
  skippedCount?: number;
};

function useTime() {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const SIZE = 130; // canvas px — compact enough to sit in the hero card corner

function AnalogFace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const now = new Date();
      const cx = SIZE / 2;
      const cy = SIZE / 2;
      const r = SIZE / 2 - 6;

      ctx.clearRect(0, 0, SIZE, SIZE);

      // Face gradient
      const grad = ctx.createRadialGradient(cx, cy, r * 0.05, cx, cy, r);
      grad.addColorStop(0, "rgba(28, 8, 8, 0.96)");
      grad.addColorStop(1, "rgba(10, 2, 2, 1)");
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(239,68,68,0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Hour tick marks
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 3 === 0;
        const outer = r - 4;
        const inner = outer - (isMain ? 8 : 4);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
        ctx.lineTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
        ctx.strokeStyle = isMain ? "rgba(239,68,68,0.9)" : "rgba(239,68,68,0.3)";
        ctx.lineWidth = isMain ? 2 : 1;
        ctx.stroke();
      }

      // Minute tick marks
      for (let i = 0; i < 60; i++) {
        if (i % 5 === 0) continue;
        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const outer = r - 4;
        const inner = outer - 2.5;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
        ctx.lineTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
        ctx.strokeStyle = "rgba(239,68,68,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      const hand = (
        frac: number,
        len: number,
        width: number,
        color: string,
        glow = false
      ) => {
        const angle = frac * Math.PI * 2 - Math.PI / 2;
        if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 6; }
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.shadowBlur = 0;
      };

      hand(hr / 12,   r * 0.45, 4,   "rgba(255,255,255,0.92)");
      hand(min / 60,  r * 0.62, 2.5, "rgba(255,255,255,0.75)");
      hand(sec / 60,  r * 0.68, 1.5, "rgba(239,68,68,1)", true);

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(239,68,68,1)";
      ctx.shadowColor = "rgba(239,68,68,0.8)";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      className="rounded-full ring-1 ring-primary-500/25 shadow-lg shadow-primary-500/10"
    />
  );
}

export default function TodayHero({
  completedCount = 0,
  pendingCount = 0,
  skippedCount = 0,
}: TodayHeroProps) {
  const todayText = useMemo(() => {
    return new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const time = useTime();
  const hours = time ? time.getHours() : 0;
  const minutes = time ? time.getMinutes().toString().padStart(2, "0") : "00";
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = time ? (hours % 12 || 12).toString().padStart(2, "0") : "00";

  return (
    <section className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary-500/10 p-6">
      {/* Top row: text info + analog clock */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-400">Today</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">{todayText}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Finish what matters, avoid fake productivity, and give yourself a day worth
            respecting tonight.
          </p>
        </div>

        {/* Analog clock + digital readout beneath */}
        <div className="flex flex-shrink-0 flex-col items-center gap-2">
          <AnalogFace />
          {time && (
            <p className="text-sm font-semibold tabular-nums text-foreground">
              {hours12}:{minutes}
              <span className="ml-1 text-xs font-medium text-primary-400">{ampm}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Completed</p>
          <p className="mt-2 text-2xl font-bold text-sky-500">{completedCount}</p>
        </div>

        <div className="rounded-xl border border-border bg-background/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pending</p>
          <p className="mt-2 text-2xl font-bold text-primary-500">{pendingCount}</p>
        </div>

        <div className="rounded-xl border border-border bg-background/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Skipped</p>
          <p className="mt-2 text-2xl font-bold text-amber-500">{skippedCount}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/tasks/create"
          className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-400"
        >
          Create task
        </Link>

        <Link
          href="/reports"
          className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Open report
        </Link>
      </div>
    </section>
  );
}