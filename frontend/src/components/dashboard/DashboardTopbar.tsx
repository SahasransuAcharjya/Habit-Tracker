"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

type DashboardTopbarProps = {
  title?: string;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function DashboardTopbar({
  title = "Dashboard",
  subtitle = "Plan, track, review, improve.",
  actionHref = "/tasks/create",
  actionLabel = "+ New Task",
}: DashboardTopbarProps) {
  const { unreadCount, markAllRead } = useNotifications();
  const router = useRouter();

  const handleBellClick = () => {
    router.push("/notifications");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            id="topbar-notification-bell"
            onClick={handleBellClick}
            aria-label="View notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground hover:shadow-sm active:scale-95"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white shadow-md shadow-primary-500/30 animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Action Button */}
          <Link
            href={actionHref}
            className="rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-400"
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}