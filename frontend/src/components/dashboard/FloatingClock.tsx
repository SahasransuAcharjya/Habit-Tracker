"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function useTime() {
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(new Date());
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function FloatingClock() {
  const pathname = usePathname();
  const time = useTime();

  // Hide on the Today page — the clock is already in TodayHero
  if (pathname === "/today") return null;
  if (!time) return null;

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = (hours % 12 || 12).toString().padStart(2, "0");
  const day = DAY_NAMES[time.getDay()];
  const date = `${MONTH_NAMES[time.getMonth()]} ${time.getDate()}`;

  return (
    <div
      id="floating-clock-widget"
      className="fixed bottom-20 right-4 z-50 lg:bottom-6 lg:right-6"
    >
      <div className="
        flex select-none flex-col items-end gap-0.5
        rounded-2xl border border-white/10 bg-black/75
        px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-md
        transition-all duration-300 hover:bg-black/85
      ">
        {/* Time */}
        <p className="text-xl font-bold tabular-nums leading-none text-white">
          {hours12}:{minutes}
          <span className="ml-1 text-sm font-semibold text-primary-400">{ampm}</span>
        </p>
        {/* Day · Date */}
        <p className="text-[11px] font-medium text-white/50">
          {day} · {date}
        </p>
      </div>
    </div>
  );
}
