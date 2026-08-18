"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CheckSquare, Repeat, BarChart3, Bell } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

const navItems = [
  { href: "/today", label: "Today", icon: CalendarDays },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/habits", label: "Habits", icon: Repeat },
  { href: "/notifications", label: "Alerts", icon: Bell },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { unreadCount } = useNotifications();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 px-2 py-2 backdrop-blur lg:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          const Icon = item.icon;
          const isNotif = item.href === "/notifications";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center rounded-xl px-1 py-2 text-[11px] font-medium transition-all duration-[550ms] ease-out active:scale-[0.94] ${
                isActive
                  ? "bg-primary-500 text-white shadow-sm shadow-primary-500/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className="relative mb-1">
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                {isNotif && unreadCount > 0 && !isActive && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[9px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}