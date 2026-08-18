"use client";

import { Bell, BellOff, CheckCheck, Trash2, Info, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { useNotifications, NotificationItem } from "@/context/NotificationContext";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const typeConfig: Record<
  NotificationItem["type"],
  { icon: React.ElementType; color: string; bg: string; ring: string }
> = {
  info: {
    icon: Info,
    color: "text-sky-600",
    bg: "bg-sky-50",
    ring: "ring-sky-200",
  },
  success: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
  },
  reminder: {
    icon: Clock,
    color: "text-primary-500",
    bg: "bg-primary-50",
    ring: "ring-primary-200",
  },
};

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, markRead, clearAll } =
    useNotifications();

  const today = notifications.length > 0 ? formatDate(notifications[0].timestamp) : formatDate(Date.now());

  return (
    <div className="min-h-screen bg-background">
      <DashboardTopbar
        title="Notifications"
        subtitle={`Today · ${today}`}
        actionHref="/tasks/create"
        actionLabel="+ New Task"
      />

      <div className="mx-auto max-w-2xl px-4 py-6 md:px-6">
        {/* Header actions */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10">
              <Bell className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
              </p>
              {unreadCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  {unreadCount} unread
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                id="mark-all-read-btn"
                onClick={markAllRead}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted hover:shadow-sm"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                id="clear-all-notifications-btn"
                onClick={clearAll}
                className="flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-600 transition hover:bg-primary-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Daily reset note */}
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          <span>
            Notifications reset daily at midnight. These are only saved for today.
          </span>
        </div>

        {/* Notification list */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <BellOff className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">No notifications yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You&apos;re all caught up! New alerts will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => {
              const cfg = typeConfig[notif.type];
              const Icon = cfg.icon;

              return (
                <button
                  key={notif.id}
                  onClick={() => markRead(notif.id)}
                  className={`group w-full rounded-2xl border px-4 py-4 text-left shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.99] ${
                    notif.read
                      ? "border-border bg-card opacity-70"
                      : "border-border bg-card-strong ring-1 ring-primary-200/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ring-1 ${cfg.bg} ${cfg.ring}`}
                    >
                      <Icon className={`h-4.5 w-4.5 ${cfg.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-sm font-semibold leading-snug ${
                            notif.read ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {notif.title}
                        </p>
                        <div className="flex flex-shrink-0 items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(notif.timestamp)}
                          </span>
                          {!notif.read && (
                            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-primary-500 shadow-sm shadow-primary-500/40" />
                          )}
                        </div>
                      </div>
                      <p
                        className={`mt-1 text-sm leading-relaxed ${
                          notif.read ? "text-muted-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {notif.message}
                      </p>

                      {/* Type badge */}
                      <span
                        className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ${cfg.bg} ${cfg.color} ${cfg.ring}`}
                      >
                        {notif.type}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
