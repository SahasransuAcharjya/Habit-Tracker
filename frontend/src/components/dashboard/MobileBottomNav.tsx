"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/today", label: "Today", icon: "📅" },
  { href: "/tasks", label: "Tasks", icon: "✅" },
  { href: "/reports", label: "Reports", icon: "📊" },
  { href: "/habits", label: "Habits", icon: "🔁" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-[#fdfaf6]/95 px-2 py-2 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-xl px-2 py-2 text-[11px] transition ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-800"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}