"use client";

import Link from "next/link";
import { useMemo, useEffect, useRef, useState } from "react";
import { useClockFace, ClockFaceId } from "@/context/ClockFaceContext";

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

// ─── Draw helpers ────────────────────────────────────────────────────────────

function drawHand(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  frac: number, len: number, width: number,
  color: string, glow?: string
) {
  const angle = frac * Math.PI * 2 - Math.PI / 2;
  if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = 8; }
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.shadowBlur = 0;
}

type DrawFn = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, now: Date) => void;

const FACE_DRAWS: Record<Exclude<ClockFaceId, "custom">, DrawFn> = {
  classic(ctx, cx, cy, r, now) {
    const g = ctx.createRadialGradient(cx, cy, r * 0.05, cx, cy, r);
    g.addColorStop(0, "#1c0808"); g.addColorStop(1, "#0a0202");
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = "rgba(239,68,68,0.45)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2; const isMain = i % 3 === 0;
      const outer = r - 4; const inner = outer - (isMain ? 9 : 5);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
      ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.strokeStyle = isMain ? "rgba(239,68,68,0.9)" : "rgba(239,68,68,0.3)";
      ctx.lineWidth = isMain ? 2 : 1; ctx.stroke();
    }
    for (let i = 0; i < 60; i++) {
      if (i % 5 === 0) continue;
      const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4));
      ctx.lineTo(cx + Math.cos(a) * (r - 7), cy + Math.sin(a) * (r - 7));
      ctx.strokeStyle = "rgba(239,68,68,0.13)"; ctx.lineWidth = 1; ctx.stroke();
    }
    const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes() + sec / 60; const hr = (now.getHours() % 12) + min / 60;
    drawHand(ctx, cx, cy, hr / 12,  r * 0.47, 5,   "rgba(255,255,255,0.92)");
    drawHand(ctx, cx, cy, min / 60, r * 0.64, 3.5, "rgba(255,255,255,0.75)");
    drawHand(ctx, cx, cy, sec / 60, r * 0.70, 1.5, "#ef4444", "#ef4444");
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#ef4444"; ctx.shadowColor = "#ef4444"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
  },

  minimal(ctx, cx, cy, r, now) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = "#f8fafc"; ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.1)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2; const isMain = i % 3 === 0;
      const outer = r - 4; const inner = outer - (isMain ? 9 : 5);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
      ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.strokeStyle = isMain ? "rgba(15,23,42,0.85)" : "rgba(15,23,42,0.3)";
      ctx.lineWidth = isMain ? 2 : 1; ctx.stroke();
    }
    const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes() + sec / 60; const hr = (now.getHours() % 12) + min / 60;
    drawHand(ctx, cx, cy, hr / 12,  r * 0.47, 4,   "#0f172a");
    drawHand(ctx, cx, cy, min / 60, r * 0.64, 2.5, "#334155");
    drawHand(ctx, cx, cy, sec / 60, r * 0.70, 1.5, "#ef4444");
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fillStyle = "#ef4444"; ctx.fill();
  },

  neon(ctx, cx, cy, r, now) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = "#000"; ctx.fill();
    ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 4;
    ctx.strokeStyle = "rgba(0,255,255,0.4)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); ctx.shadowBlur = 0;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2; const isMain = i % 3 === 0;
      const outer = r - 4; const inner = outer - (isMain ? 9 : 5);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
      ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.shadowColor = "#00ffff"; ctx.shadowBlur = isMain ? 8 : 3;
      ctx.strokeStyle = isMain ? "#00ffff" : "rgba(0,255,255,0.35)";
      ctx.lineWidth = isMain ? 2 : 1; ctx.stroke(); ctx.shadowBlur = 0;
    }
    const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes() + sec / 60; const hr = (now.getHours() % 12) + min / 60;
    drawHand(ctx, cx, cy, hr / 12,  r * 0.47, 4,   "#00ffff", "#00ffff");
    drawHand(ctx, cx, cy, min / 60, r * 0.64, 2.5, "#00ffff", "#00ffff");
    drawHand(ctx, cx, cy, sec / 60, r * 0.70, 1.5, "#ff00ff", "#ff00ff");
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffff"; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
  },

  slate(ctx, cx, cy, r, now) {
    const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
    g.addColorStop(0, "#1e293b"); g.addColorStop(1, "#0f172a");
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = "rgba(148,163,184,0.25)"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2; const isMain = i % 3 === 0;
      const outer = r - 4; const inner = outer - (isMain ? 9 : 5);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
      ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.strokeStyle = isMain ? "rgba(148,163,184,0.9)" : "rgba(148,163,184,0.3)";
      ctx.lineWidth = isMain ? 2 : 1; ctx.stroke();
    }
    const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes() + sec / 60; const hr = (now.getHours() % 12) + min / 60;
    drawHand(ctx, cx, cy, hr / 12,  r * 0.47, 5,   "#f1f5f9");
    drawHand(ctx, cx, cy, min / 60, r * 0.64, 3,   "#cbd5e1");
    drawHand(ctx, cx, cy, sec / 60, r * 0.70, 1.5, "#38bdf8", "#38bdf8");
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8"; ctx.shadowColor = "#38bdf8"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
  },

  gold(ctx, cx, cy, r, now) {
    const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
    g.addColorStop(0, "#292524"); g.addColorStop(1, "#1c1917");
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = "rgba(234,179,8,0.4)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2; const isMain = i % 3 === 0;
      const outer = r - 4; const inner = outer - (isMain ? 9 : 5);
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
      ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.strokeStyle = isMain ? "rgba(234,179,8,0.9)" : "rgba(234,179,8,0.3)";
      ctx.lineWidth = isMain ? 2 : 1; ctx.stroke();
    }
    const sec = now.getSeconds() + now.getMilliseconds() / 1000;
    const min = now.getMinutes() + sec / 60; const hr = (now.getHours() % 12) + min / 60;
    drawHand(ctx, cx, cy, hr / 12,  r * 0.47, 5,   "#fef9c3");
    drawHand(ctx, cx, cy, min / 60, r * 0.64, 3,   "#fde68a");
    drawHand(ctx, cx, cy, sec / 60, r * 0.70, 1.5, "#eab308", "#eab308");
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#eab308"; ctx.shadowColor = "#eab308"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
  },
};

// ─── Analog face canvas ──────────────────────────────────────────────────────

const SIZE = 130;

function AnalogFace({ faceId, customBg }: { faceId: ClockFaceId; customBg: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const customImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // Preload custom image
  useEffect(() => {
    if (faceId === "custom" && customBg) {
      const img = new Image();
      img.src = customBg;
      img.onload = () => { customImgRef.current = img; };
    } else {
      customImgRef.current = null;
    }
  }, [faceId, customBg]);

  useEffect(() => {
    if (!mounted) return;
    const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 6;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, SIZE, SIZE);
      const now = new Date();

      if (faceId === "custom" && customImgRef.current) {
        ctx.save();
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(customImgRef.current, 0, 0, SIZE, SIZE);
        ctx.restore();
        // White hands on custom bg
        const sec = now.getSeconds() + now.getMilliseconds() / 1000;
        const min = now.getMinutes() + sec / 60; const hr = (now.getHours() % 12) + min / 60;
        drawHand(ctx, cx, cy, hr / 12,  r * 0.47, 5,   "rgba(255,255,255,0.95)");
        drawHand(ctx, cx, cy, min / 60, r * 0.64, 3.5, "rgba(255,255,255,0.85)");
        drawHand(ctx, cx, cy, sec / 60, r * 0.70, 1.5, "#ef4444", "#ef4444");
        ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444"; ctx.shadowColor = "#ef4444"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
        // Ring
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.2)"; ctx.lineWidth = 2; ctx.stroke();
      } else {
        const fn = FACE_DRAWS[faceId as Exclude<ClockFaceId, "custom">] ?? FACE_DRAWS.classic;
        fn(ctx, cx, cy, r, now);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mounted, faceId]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      className="rounded-full ring-1 ring-white/10 shadow-lg shadow-black/20"
    />
  );
}

// ─── TodayHero ───────────────────────────────────────────────────────────────

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
  const { face, customImage } = useClockFace();

  const hours = time ? time.getHours() : 0;
  const minutes = time ? time.getMinutes().toString().padStart(2, "0") : "00";
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = time ? (hours % 12 || 12).toString().padStart(2, "0") : "00";

  return (
    <section className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary-500/10 p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-400">Today</p>
          <h2 className="mt-2 text-3xl font-bold text-foreground">{todayText}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Finish what matters, avoid fake productivity, and give yourself a day worth
            respecting tonight.
          </p>
        </div>

        {/* Analog clock — face driven by context */}
        <div className="flex flex-shrink-0 flex-col items-center gap-2">
          <AnalogFace faceId={face} customBg={customImage} />
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