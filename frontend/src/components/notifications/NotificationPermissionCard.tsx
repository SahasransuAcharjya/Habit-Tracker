"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { apiPost } from "@/lib/api";

type NotificationSubscriptionPayload = {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

export default function NotificationPermissionCard() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"idle" | "success" | "error">("idle");

  const enableNotifications = async () => {
    try {
      setLoading(true);
      setStatus("");
      setStatusType("idle");

      if (typeof window === "undefined") {
        throw new Error("Notifications can only be enabled in the browser.");
      }

      if (!("serviceWorker" in navigator)) {
        throw new Error("Service worker is not supported in this browser.");
      }

      if (!("PushManager" in window)) {
        throw new Error("Push notifications are not supported in this browser.");
      }

      if (!("Notification" in window)) {
        throw new Error("Notification API is not supported in this browser.");
      }

      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidPublicKey) {
        throw new Error("NEXT_PUBLIC_VAPID_PUBLIC_KEY is missing in .env.local.");
      }

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        throw new Error("Notification permission was denied.");
      }

      const registration = await navigator.serviceWorker.register("/sw.js");

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
      }

      const token = localStorage.getItem("activity_token");
      const result = await apiPost<{ success: boolean; message: string }>("/notifications", subscription as unknown as NotificationSubscriptionPayload, token);

      if (!result || ("success" in result && !result.success)) {
        throw new Error((result as any).message || "Failed to save notification subscription.");
      }

      setStatus("Notifications enabled successfully.");
      setStatusType("success");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to enable notifications.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">Notifications</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Enable reminders</h3>
          <p className="mt-2 text-sm text-slate-400">
            Allow push notifications so the app can remind you about pending tasks.
          </p>
        </div>

        <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
          Push
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-4">
        <ul className="space-y-2 text-sm text-slate-300">
          <li>- Repeated reminders for pending tasks.</li>
          <li>- Better support for your Android install flow later.</li>
          <li>- Required for your personal assistant behavior.</li>
        </ul>
      </div>

      <Button
        onClick={enableNotifications}
        disabled={loading}
        className="mt-5"
      >
        {loading ? "Enabling..." : "Enable notifications"}
      </Button>

      {status ? (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-sm ${
            statusType === "success"
              ? "border border-emerald-800 bg-emerald-950/40 text-emerald-300"
              : "border border-red-800 bg-red-950/40 text-red-300"
          }`}
        >
          {status}
        </div>
      ) : null}
    </div>
  );
}