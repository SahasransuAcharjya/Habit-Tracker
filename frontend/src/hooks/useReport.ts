"use client";

import { useCallback, useEffect, useState } from "react";

export type DailyReport = {
  id?: string;
  reportDate?: string;
  score?: number;
  summary?: string;
  praiseText?: string;
  tauntText?: string;
  motivationText?: string;
};

export function useReport() {
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("activity_token");

  const fetchTodayReport = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/reports/today", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch today report.");
      }

      setReport(result.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch today report.");
    } finally {
      setLoading(false);
    }
  }, []);

  const generateTodayReport = useCallback(async () => {
    const response = await fetch("/api/reports/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to generate report.");
    }

    setReport(result.data || null);
    return result.data;
  }, []);

  useEffect(() => {
    fetchTodayReport();
  }, [fetchTodayReport]);

  return {
    report,
    loading,
    error,
    fetchTodayReport,
    generateTodayReport,
  };
}