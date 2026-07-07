"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/tasks", label: "Tasks" },
  { href: "/habits", label: "Habits" },
  { href: "/history", label: "History" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const token = localStorage.getItem("activity_token");
    const user = localStorage.getItem("activity_user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name || "User");
      } catch {
        setUserName("User");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("activity_token");
    localStorage.removeItem("activity_user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-72 border-r border-slate-800 bg-slate-900/70 p-6 lg:block">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Activity Assistant</p>
            <h2 className="mt-3 text-2xl font-bold">Stay accountable</h2>
            <p className="mt-2 text-sm text-slate-400">Welcome back, {userName}.</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-cyan-500 text-slate-950 font-semibold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-8 w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Logout
          </button>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-800 bg-slate-950/80 px-4 py-4 backdrop-blur md:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-lg font-semibold">Dashboard</h1>
                <p className="text-sm text-slate-400">Plan, track, review, improve.</p>
              </div>

              <Link
                href="/tasks/create"
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                + New Task
              </Link>
            </div>
          </header>

          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}