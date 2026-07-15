"use client";

import { useCallback, useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";

import { Report as DailyReport } from "@/types/report";

export function useReport() {
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("activity_token");

  const fetchTodayReport = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await apiGet<{ data: DailyReport }>("/reports/today", getToken());

      setReport(result.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch today report.");
    } finally {
      setLoading(false);
    }
  }, []);

  const generateTodayReport = useCallback(async () => {
    const result = await apiPost<{ data: DailyReport }>("/reports/generate", undefined, getToken());

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