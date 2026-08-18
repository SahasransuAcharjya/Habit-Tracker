"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Upload, X, CheckCircle2 } from "lucide-react";
import { useClockFace, ClockFaceId } from "@/context/ClockFaceContext";

// ─── Face definition ────────────────────────────────────────────────────────

type FaceDef = {
  id: ClockFaceId;
  label: string;
  description: string;
  draw: (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, now: Date) => void;
};

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

const FACES: FaceDef[] = [
  {
    id: "classic",
    label: "Classic",
    description: "Dark face, red accents",
    draw(ctx, cx, cy, r, now) {
      const g = ctx.createRadialGradient(cx, cy, r * 0.05, cx, cy, r);
      g.addColorStop(0, "#1c0808");
      g.addColorStop(1, "#0a0202");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = "rgba(239,68,68,0.45)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 3 === 0;
        const outer = r - 3; const inner = outer - (isMain ? 7 : 4);
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
        ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.strokeStyle = isMain ? "rgba(239,68,68,0.9)" : "rgba(239,68,68,0.3)";
        ctx.lineWidth = isMain ? 2 : 1; ctx.stroke();
      }
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr  = (now.getHours() % 12) + min / 60;
      drawHand(ctx, cx, cy, hr / 12,  r * 0.50, 4,   "rgba(255,255,255,0.92)");
      drawHand(ctx, cx, cy, min / 60, r * 0.68, 2.5, "rgba(255,255,255,0.75)");
      drawHand(ctx, cx, cy, sec / 60, r * 0.75, 1.5, "#ef4444", "#ef4444");
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ef4444"; ctx.shadowColor = "#ef4444"; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "White face, thin lines",
    draw(ctx, cx, cy, r, now) {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#f8fafc"; ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.08)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 3 === 0;
        const outer = r - 3; const inner = outer - (isMain ? 8 : 4);
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
        ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.strokeStyle = isMain ? "rgba(15,23,42,0.85)" : "rgba(15,23,42,0.3)";
        ctx.lineWidth = isMain ? 2 : 1; ctx.stroke();
      }
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr  = (now.getHours() % 12) + min / 60;
      drawHand(ctx, cx, cy, hr / 12,  r * 0.50, 3,   "#0f172a");
      drawHand(ctx, cx, cy, min / 60, r * 0.68, 2,   "#334155");
      drawHand(ctx, cx, cy, sec / 60, r * 0.75, 1,   "#ef4444");
      ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ef4444"; ctx.fill();
    },
  },
  {
    id: "neon",
    label: "Neon",
    description: "Black face, cyan glow",
    draw(ctx, cx, cy, r, now) {
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#000"; ctx.fill();
      ctx.strokeStyle = "rgba(0,255,255,0.3)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 3 === 0;
        const outer = r - 3; const inner = outer - (isMain ? 8 : 4);
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
        ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.shadowColor = "#00ffff"; ctx.shadowBlur = isMain ? 6 : 2;
        ctx.strokeStyle = isMain ? "#00ffff" : "rgba(0,255,255,0.3)";
        ctx.lineWidth = isMain ? 2 : 1; ctx.stroke(); ctx.shadowBlur = 0;
      }
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr  = (now.getHours() % 12) + min / 60;
      drawHand(ctx, cx, cy, hr / 12,  r * 0.50, 3,   "#00ffff", "#00ffff");
      drawHand(ctx, cx, cy, min / 60, r * 0.68, 2,   "#00ffff", "#00ffff");
      drawHand(ctx, cx, cy, sec / 60, r * 0.75, 1.5, "#ff00ff", "#ff00ff");
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#00ffff"; ctx.shadowColor = "#00ffff"; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
    },
  },
  {
    id: "slate",
    label: "Slate",
    description: "Cool blue-grey dark face",
    draw(ctx, cx, cy, r, now) {
      const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      g.addColorStop(0, "#1e293b");
      g.addColorStop(1, "#0f172a");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = "rgba(148,163,184,0.25)"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 3 === 0;
        const outer = r - 3; const inner = outer - (isMain ? 8 : 4);
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
        ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.strokeStyle = isMain ? "rgba(148,163,184,0.9)" : "rgba(148,163,184,0.3)";
        ctx.lineWidth = isMain ? 2 : 1; ctx.stroke();
      }
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr  = (now.getHours() % 12) + min / 60;
      drawHand(ctx, cx, cy, hr / 12,  r * 0.50, 4,   "#f1f5f9");
      drawHand(ctx, cx, cy, min / 60, r * 0.68, 2.5, "#cbd5e1");
      drawHand(ctx, cx, cy, sec / 60, r * 0.75, 1.5, "#38bdf8", "#38bdf8");
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#38bdf8"; ctx.shadowColor = "#38bdf8"; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
    },
  },
  {
    id: "gold",
    label: "Gold",
    description: "Charcoal face, gold accents",
    draw(ctx, cx, cy, r, now) {
      const g = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      g.addColorStop(0, "#292524");
      g.addColorStop(1, "#1c1917");
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = "rgba(234,179,8,0.35)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const isMain = i % 3 === 0;
        const outer = r - 3; const inner = outer - (isMain ? 8 : 4);
        ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
        ctx.lineTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.strokeStyle = isMain ? "rgba(234,179,8,0.9)" : "rgba(234,179,8,0.3)";
        ctx.lineWidth = isMain ? 2 : 1; ctx.stroke();
      }
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr  = (now.getHours() % 12) + min / 60;
      drawHand(ctx, cx, cy, hr / 12,  r * 0.50, 4,   "#fef9c3");
      drawHand(ctx, cx, cy, min / 60, r * 0.68, 2.5, "#fde68a");
      drawHand(ctx, cx, cy, sec / 60, r * 0.75, 1.5, "#eab308", "#eab308");
      ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#eab308"; ctx.shadowColor = "#eab308"; ctx.shadowBlur = 6; ctx.fill(); ctx.shadowBlur = 0;
    },
  },
];

// ─── Mini preview canvas ────────────────────────────────────────────────────

const PREVIEW_SIZE = 80;

function FacePreview({ faceDef, customBg }: { faceDef: FaceDef; customBg?: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const size = PREVIEW_SIZE;
      const cx = size / 2, cy = size / 2;
      const r = size / 2 - 3;
      ctx.clearRect(0, 0, size, size);

      if (faceDef.id === "custom" && customBg) {
        const img = new Image();
        img.src = customBg;
        img.onload = () => {
          ctx.save();
          ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
          ctx.drawImage(img, 0, 0, size, size);
          ctx.restore();
          // draw hands on top
          const now = new Date();
          const sec = now.getSeconds(); const min = now.getMinutes() + sec / 60;
          const hr = (now.getHours() % 12) + min / 60;
          drawHand(ctx, cx, cy, hr / 12,  r * 0.50, 3,   "#fff");
          drawHand(ctx, cx, cy, min / 60, r * 0.68, 2,   "#fff");
          drawHand(ctx, cx, cy, sec / 60, r * 0.75, 1.5, "#ef4444");
          ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#ef4444"; ctx.fill();
        };
      } else {
        faceDef.draw(ctx, cx, cy, r, new Date());
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [faceDef, customBg]);

  return (
    <canvas
      ref={canvasRef}
      width={PREVIEW_SIZE}
      height={PREVIEW_SIZE}
      className="rounded-full"
    />
  );
}

// ─── Main selector component ────────────────────────────────────────────────

export default function ClockFaceSelector() {
  const { face, customImage, setFace, setCustomImage, clearCustomImage } = useClockFace();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [imgError, setImgError] = useState("");

  const handleFile = useCallback((file: File) => {
    setImgError("");
    if (!file.type.startsWith("image/")) {
      setImgError("Please upload a valid image file.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setImgError("Image must be under 3 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setCustomImage(dataUrl);
    };
    reader.readAsDataURL(file);
  }, [setCustomImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  // The "custom" entry is dynamic (only shown when an image exists or to prompt upload)
  const builtinFaces = FACES.filter(f => f.id !== "custom");

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-foreground mb-1">Clock Face</p>
        <p className="text-xs text-muted-foreground">
          Choose a style for the analog clock shown on the Today page.
        </p>
      </div>

      {/* Built-in face grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {builtinFaces.map((faceDef) => {
          const isSelected = face === faceDef.id;
          return (
            <button
              key={faceDef.id}
              type="button"
              id={`clock-face-${faceDef.id}`}
              onClick={() => setFace(faceDef.id)}
              className={`
                relative flex flex-col items-center gap-2 rounded-2xl border p-3 text-center
                transition-all duration-200 hover:shadow-md active:scale-[0.97]
                ${isSelected
                  ? "border-primary-400 bg-primary-500/10 shadow-sm shadow-primary-500/20 ring-1 ring-primary-400/40"
                  : "border-border bg-card hover:border-border/80 hover:bg-muted/40"
                }
              `}
            >
              {isSelected && (
                <span className="absolute -right-1.5 -top-1.5 z-10">
                  <CheckCircle2 className="h-5 w-5 text-primary-500 drop-shadow" />
                </span>
              )}
              <FacePreview faceDef={faceDef} />
              <div>
                <p className={`text-xs font-semibold ${isSelected ? "text-primary-500" : "text-foreground"}`}>
                  {faceDef.label}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  {faceDef.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom image upload */}
      <div className="mt-2">
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
          Custom Image
        </p>

        {customImage ? (
          /* Show current custom face with replace/remove options */
          <div
            className={`
              flex items-center gap-4 rounded-2xl border p-4
              transition-all duration-200
              ${face === "custom"
                ? "border-primary-400 bg-primary-500/10 ring-1 ring-primary-400/40"
                : "border-border bg-card"
              }
            `}
          >
            <div
              className="relative cursor-pointer"
              onClick={() => setFace("custom")}
            >
              <FacePreview
                faceDef={{ id: "custom", label: "Custom", description: "", draw: () => {} }}
                customBg={customImage}
              />
              {face === "custom" && (
                <span className="absolute -right-1.5 -top-1.5">
                  <CheckCircle2 className="h-5 w-5 text-primary-500 drop-shadow" />
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Custom face active</p>
              <p className="text-xs text-muted-foreground mt-0.5">Your uploaded image is used as the clock background.</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                >
                  <Upload className="h-3 w-3" />
                  Replace
                </button>
                <button
                  type="button"
                  onClick={clearCustomImage}
                  className="flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-600 transition hover:bg-primary-100"
                >
                  <X className="h-3 w-3" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Drop zone */
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed
              px-6 py-8 text-center transition-all duration-200
              ${dragOver
                ? "border-primary-400 bg-primary-500/10"
                : "border-border bg-card/50 hover:border-primary-400/50 hover:bg-muted/30"
              }
            `}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {dragOver ? "Drop to set as clock face" : "Upload a custom clock face"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                PNG, JPG, WebP · max 3 MB · square images work best
              </p>
            </div>
          </div>
        )}

        {imgError && (
          <p className="mt-2 text-xs text-primary-500">{imgError}</p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
