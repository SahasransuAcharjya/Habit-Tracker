"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "DONE" | "MISSED" | "SKIPPED";
  startTime?: string | null;
  endTime?: string | null;
  reminderInterval?: number | null;
  recurrenceRule?: string | null;
};

type CreateTaskPayload = {
  title: string;
  description: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  startTime: string | null;
  endTime: string | null;
  reminderInterval: number | null;
  recurrenceRule: string | null;
};

type TaskFilters = {
  status: string;
  priority: string;
  category: string;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "",
    priority: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => localStorage.getItem("activity_token");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch tasks.");
      }

      setTasks(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (payload: CreateTaskPayload) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create task.");
    }

    setTasks((prev) => [result.data, ...prev]);
    return result.data;
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete task.");
    }

    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    setSelectedTask((prev) => (prev?.id === taskId ? null : prev));
  }, []);

  const completeTask = useCallback(async (taskId: string) => {
    const response = await fetch(`/api/tasks/${taskId}/complete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to complete task.");
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "DONE" } : task
      )
    );

    setSelectedTask((prev) =>
      prev?.id === taskId ? { ...prev, status: "DONE" } : prev
    );
  }, []);

  const skipTask = useCallback(async (taskId: string) => {
    const response = await fetch(`/api/tasks/${taskId}/skip`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to skip task.");
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "SKIPPED" } : task
      )
    );

    setSelectedTask((prev) =>
      prev?.id === taskId ? { ...prev, status: "SKIPPED" } : prev
    );
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = filters.status ? task.status === filters.status : true;
      const priorityMatch = filters.priority ? task.priority === filters.priority : true;
      const categoryMatch = filters.category
        ? (task.category || "")
            .toLowerCase()
            .includes(filters.category.toLowerCase())
        : true;

      return statusMatch && priorityMatch && categoryMatch;
    });
  }, [tasks, filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    filteredTasks,
    selectedTask,
    setSelectedTask,
    filters,
    setFilters,
    loading,
    error,
    fetchTasks,
    createTask,
    deleteTask,
    completeTask,
    skipTask,
  };
}