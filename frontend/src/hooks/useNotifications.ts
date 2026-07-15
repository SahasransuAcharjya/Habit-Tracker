"use client";

import { useCallback, useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api";

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

      const result = await apiGet<{ data: NotificationSettings }>("/notifications/settings", getToken());

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
      await apiPatch("/notifications/settings", payload, getToken());

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