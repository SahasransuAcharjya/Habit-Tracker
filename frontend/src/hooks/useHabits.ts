"use client";

import { useCallback, useEffect, useState } from "react";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/api";

import { Habit } from "@/types/habit";

type CreateHabitPayload = {
  title: string;
  description: string;
  category: string;
  frequency: string;
  targetDays: number[];
  reminderTime: string | null;
};

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("activity_token");

  const fetchHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await apiGet<{ data: Habit[] }>("/habits", getToken());

      setHabits(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch habits.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createHabit = useCallback(async (payload: CreateHabitPayload) => {
    const result = await apiPost<{ data: Habit }>("/habits", payload, getToken());

    setHabits((prev) => [result.data, ...prev]);
    return result.data;
  }, []);

  const deleteHabit = useCallback(async (habitId: string) => {
    await apiDelete(`/habits/${habitId}`, getToken());

    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  }, []);

  const toggleHabitActive = useCallback(async (habitId: string, nextValue: boolean) => {
    await apiPatch(`/habits/${habitId}`, { isActive: nextValue }, getToken());

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId ? { ...habit, isActive: nextValue } : habit
      )
    );
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return {
    habits,
    loading,
    error,
    fetchHabits,
    createHabit,
    deleteHabit,
    toggleHabitActive,
  };
}