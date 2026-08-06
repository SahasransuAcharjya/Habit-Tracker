"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

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
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="hidden min-h-screen w-72 border-r border-stone-200 bg-white/80 p-6 lg:block">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-red-400">
          Activity Assistant
        </p>
        <h2 className="mt-3 text-2xl font-bold text-stone-800">Stay accountable</h2>
        <p className="mt-2 text-sm text-stone-500">Welcome back, {userName}.</p>
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
                  ? "bg-red-500 font-semibold text-white"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-800"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-[#fdfaf6] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Mindset</p>
        <p className="mt-2 text-sm text-stone-600">
          Your results tomorrow depend on the excuses you reject today.
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
      >
        Logout
      </button>
    </aside>
  );
}