"use client";

import { useCallback, useEffect, useState } from "react";

export type Habit = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  frequency?: string;
  targetDays?: number[];
  reminderTime?: string | null;
  isActive?: boolean;
};

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

      const response = await fetch("/api/habits", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch habits.");
      }

      setHabits(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch habits.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createHabit = useCallback(async (payload: CreateHabitPayload) => {
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create habit.");
    }

    setHabits((prev) => [result.data, ...prev]);
    return result.data;
  }, []);

  const deleteHabit = useCallback(async (habitId: string) => {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete habit.");
    }

    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  }, []);

  const toggleHabitActive = useCallback(async (habitId: string, nextValue: boolean) => {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ isActive: nextValue }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update habit.");
    }

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