"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { CalendarDays, CheckSquare, Repeat, Clock, BarChart3, Settings } from "lucide-react";

type DashboardSidebarProps = {
  userName?: string;
};

const navItems = [
  { href: "/today", label: "Today", icon: CalendarDays },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/habits", label: "Habits", icon: Repeat },
  { href: "/history", label: "History", icon: Clock },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar({
  userName = "User",
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="hidden min-h-screen w-72 border-r border-border bg-card/80 p-6 lg:block">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-orange-400 to-orange-600 text-lg font-bold text-white shadow-md shadow-orange-500/20">
            V
          </div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary-400 font-medium">
            Vow
          </p>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-foreground tracking-tight">Stay accountable</h2>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back, {userName}.</p>
      </div>

      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
            
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-[550ms] ease-out active:scale-[0.98] ${
                isActive
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-border bg-background p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Mindset</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your results tomorrow depend on the excuses you reject today.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-all duration-[550ms] ease-out hover:border-border hover:bg-muted/50 hover:shadow-sm active:scale-[0.98] active:translate-y-0"
      >
        Logout
      </button>
    </aside>
  );
}