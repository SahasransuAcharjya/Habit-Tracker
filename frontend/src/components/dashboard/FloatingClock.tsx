"use client";

import { usePathname } from "next/navigation";
import LiveClock from "./LiveClock";

/**
 * FloatingClock
 * - On /today  → renders the full clock inside the page (this component renders nothing;
 *                the full clock is embedded directly in the Today page).
 * - On all other pages → renders a compact floating widget fixed to bottom-right.
 */
export default function FloatingClock() {
  const pathname = usePathname();
  const isToday = pathname === "/today";

  if (isToday) return null; // Full clock is shown in the Today page itself

  return (
    <div
      id="floating-clock-widget"
      className="fixed bottom-20 right-4 z-50 lg:bottom-6 lg:right-6"
    >
      <div
        className="
          group relative flex cursor-default select-none flex-col items-center
          rounded-2xl border border-white/10 bg-black/80 px-3 pb-3 pt-2.5
          shadow-2xl shadow-black/40 backdrop-blur-md
          transition-all duration-500 ease-out
          hover:scale-105 hover:shadow-primary-500/20
        "
        style={{ minWidth: 90 }}
      >
        {/* Subtle red glow behind */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-primary-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <LiveClock compact />
      </div>
    </div>
  );
}
