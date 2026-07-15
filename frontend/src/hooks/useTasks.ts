"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/api";

import { Task, TaskPriority } from "@/types/task";

type CreateTaskPayload = {
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
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

      const result = await apiGet<{ data: Task[] }>("/tasks", getToken());

      setTasks(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (payload: CreateTaskPayload) => {
    const result = await apiPost<{ data: Task }>("/tasks", payload, getToken());

    setTasks((prev: Task[]) => [result.data, ...prev]);
    return result.data;
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    await apiDelete(`/tasks/${taskId}`, getToken());

    setTasks((prev: Task[]) => prev.filter((task) => task.id !== taskId));

    setSelectedTask((prev: Task | null) => (prev?.id === taskId ? null : prev));
  }, []);

  const completeTask = useCallback(async (taskId: string) => {
    await apiPatch(`/tasks/${taskId}/complete`, undefined, getToken());

    setTasks((prev: Task[]) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "DONE" } : task
      )
    );

    setSelectedTask((prev: Task | null) =>
      prev?.id === taskId ? { ...prev, status: "DONE" } : prev
    );
  }, []);

  const skipTask = useCallback(async (taskId: string) => {
    await apiPatch(`/tasks/${taskId}/skip`, undefined, getToken());

    setTasks((prev: Task[]) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "SKIPPED" } : task
      )
    );

    setSelectedTask((prev: Task | null) =>
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