"use client";

import { useEffect, useRef, useState } from "react";

type LiveClockProps = {
  compact?: boolean;
};

export default function LiveClock({ compact = false }: LiveClockProps) {
  const [time, setTime] = useState<Date | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  // Hydration-safe: only set time on client
  useEffect(() => {
    setTime(new Date());
  }, []);

  useEffect(() => {
    if (time === null) return;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const now = new Date();
      setTime(now);

      const size = canvas.width;
      const cx = size / 2;
      const cy = size / 2;
      const r = size / 2 - (compact ? 4 : 8);

      ctx.clearRect(0, 0, size, size);

      // --- Face ---
      const gradient = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      if (compact) {
        gradient.addColorStop(0, "rgba(30, 10, 10, 0.92)");
        gradient.addColorStop(1, "rgba(15, 5, 5, 0.98)");
      } else {
        gradient.addColorStop(0, "rgba(25, 8, 8, 0.94)");
        gradient.addColorStop(1, "rgba(10, 3, 3, 0.99)");
      }
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // --- Outer ring ---
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(239,68,68,0.35)";
      ctx.lineWidth = compact ? 1.5 : 2.5;
      ctx.stroke();

      // --- Hour markers ---
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 3 === 0;
        const len = isMain ? (compact ? 5 : 10) : (compact ? 3 : 5);
        const outerR = r - (compact ? 3 : 6);
        const innerR = outerR - len;

        ctx.beginPath();
        ctx.moveTo(
          cx + Math.cos(angle) * outerR,
          cy + Math.sin(angle) * outerR
        );
        ctx.lineTo(
          cx + Math.cos(angle) * innerR,
          cy + Math.sin(angle) * innerR
        );
        ctx.strokeStyle = isMain
          ? "rgba(239,68,68,0.9)"
          : "rgba(239,68,68,0.35)";
        ctx.lineWidth = isMain ? (compact ? 1.5 : 2) : (compact ? 1 : 1.5);
        ctx.stroke();
      }

      // --- Minute markers (full version only) ---
      if (!compact) {
        for (let i = 0; i < 60; i++) {
          if (i % 5 === 0) continue;
          const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const outerR = r - 6;
          const innerR = outerR - 3;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
          ctx.lineTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
          ctx.strokeStyle = "rgba(239,68,68,0.18)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // --- Hands ---
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      const drawHand = (
        angleFrac: number,
        length: number,
        width: number,
        color: string,
        glow?: boolean
      ) => {
        const angle = angleFrac * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * length;
        const y = cy + Math.sin(angle) * length;

        if (glow) {
          ctx.shadowColor = color;
          ctx.shadowBlur = compact ? 4 : 8;
        }

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.shadowBlur = 0;
      };

      // Hour hand
      drawHand(hr / 12, r * (compact ? 0.42 : 0.44), compact ? 2.5 : 5, "rgba(255,255,255,0.9)");
      // Minute hand
      drawHand(min / 60, r * (compact ? 0.58 : 0.62), compact ? 1.8 : 3.5, "rgba(255,255,255,0.75)");
      // Second hand
      drawHand(sec / 60, r * (compact ? 0.65 : 0.68), compact ? 1 : 1.5, "rgba(239,68,68,1)", true);

      // --- Center dot ---
      ctx.beginPath();
      ctx.arc(cx, cy, compact ? 2.5 : 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(239,68,68,1)";
      ctx.shadowColor = "rgba(239,68,68,0.7)";
      ctx.shadowBlur = compact ? 4 : 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [compact, time]);

  if (time === null) return null;

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = (hours % 12 || 12).toString().padStart(2, "0");

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayName = dayNames[time.getDay()];
  const dateStr = `${monthNames[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`;

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <canvas
          ref={canvasRef}
          width={72}
          height={72}
          className="rounded-full"
        />
        <div className="text-center">
          <p className="text-[11px] font-bold tabular-nums text-white leading-none">
            {hours12}:{minutes}
            <span className="ml-0.5 text-[9px] text-primary-400">{ampm}</span>
          </p>
          <p className="text-[9px] text-white/40 mt-0.5 leading-none">{dayName.slice(0, 3)}</p>
        </div>
      </div>
    );
  }

  // Full version
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Analog face */}
      <div className="relative">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary-500/10 blur-2xl scale-110 pointer-events-none" />
        <canvas
          ref={canvasRef}
          width={220}
          height={220}
          className="relative z-10 rounded-full shadow-2xl shadow-primary-500/20 ring-1 ring-primary-500/20"
        />
      </div>

      {/* Digital time */}
      <div className="text-center">
        <div className="flex items-end justify-center gap-1">
          <span className="text-5xl font-bold tabular-nums tracking-tight text-foreground">
            {hours12}:{minutes}
          </span>
          <span className="mb-1.5 text-xl font-semibold text-primary-400">:{seconds}</span>
          <span className="mb-2 ml-1 text-lg font-medium text-muted-foreground">{ampm}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {dayName} · {dateStr}
        </p>
      </div>
    </div>
  );
}
