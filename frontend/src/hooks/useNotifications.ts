"use client";

import { useCallback, useEffect, useState } from "react";

type NotificationSettings = {
  remindersEnabled: boolean;
  reminderInterval: number | null;
  autoMarkMissedEnabled: boolean;
  totalTrackedTasks: number;
};

export function useNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>({
    remindersEnabled: false,
    reminderInterval: null,
    autoMarkMissedEnabled: true,
    totalTrackedTasks: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("activity_token");

  const fetchNotificationSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/notifications/settings", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch notification settings.");
      }

      setSettings(result.data || settings);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch notification settings."
      );
    } finally {
      setLoading(false);
    }
  }, [settings]);

  const updateNotificationSettings = useCallback(
    async (payload: Partial<NotificationSettings>) => {
      const response = await fetch("/api/notifications/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update notification settings.");
      }

      setSettings((prev) => ({
        ...prev,
        ...payload,
      }));
    },
    []
  );

  useEffect(() => {
    fetchNotificationSettings();
  }, [fetchNotificationSettings]);

  return {
    settings,
    loading,
    error,
    fetchNotificationSettings,
    updateNotificationSettings,
  };
}