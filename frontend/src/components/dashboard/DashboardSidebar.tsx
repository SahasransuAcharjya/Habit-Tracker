"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type DashboardSidebarProps = {
  userName?: string;
};

const navItems = [
  { href: "/today", label: "Today", icon: "📅" },
  { href: "/tasks", label: "Tasks", icon: "✅" },
  { href: "/habits", label: "Habits", icon: "🔁" },
  { href: "/history", label: "History", icon: "🕘" },
  { href: "/reports", label: "Reports", icon: "📊" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardSidebar({
  userName = "User",
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("activity_token");
    localStorage.removeItem("activity_user");
    router.push("/login");
  };

  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-800 bg-slate-900/80 p-6 lg:block">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
          Activity Assistant
        </p>
        <h2 className="mt-3 text-2xl font-bold text-white">Stay accountable</h2>
        <p className="mt-2 text-sm text-slate-400">Welcome back, {userName}.</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-cyan-500 font-semibold text-slate-950"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Mindset</p>
        <p className="mt-2 text-sm text-slate-300">
          Your results tomorrow depend on the excuses you reject today.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
      >
        Logout
      </button>
    </aside>
  );
}