"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "reminder";
  timestamp: number; // epoch ms
  read: boolean;
};

type StoredNotifications = {
  date: string; // YYYY-MM-DD
  items: NotificationItem[];
};

type NotificationContextType = {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (
    n: Omit<NotificationItem, "id" | "timestamp" | "read">
  ) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  clearAll: () => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

const STORAGE_KEY = "vow_notifications";

function getTodayDateStr() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

function loadFromStorage(): NotificationItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const stored: StoredNotifications = JSON.parse(raw);
    if (stored.date !== getTodayDateStr()) {
      // Day changed — reset
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
    return stored.items;
  } catch {
    return [];
  }
}

function saveToStorage(items: NotificationItem[]) {
  if (typeof window === "undefined") return;
  const stored: StoredNotifications = {
    date: getTodayDateStr(),
    items,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Load on mount (client-side only)
  useEffect(() => {
    setNotifications(loadFromStorage());
  }, []);

  const addNotification = useCallback(
    (n: Omit<NotificationItem, "id" | "timestamp" | "read">) => {
      const newItem: NotificationItem = {
        ...n,
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
        read: false,
      };
      setNotifications((prev) => {
        const updated = [newItem, ...prev];
        saveToStorage(updated);
        return updated;
      });
    },
    []
  );

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    saveToStorage([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllRead,
        markRead,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return ctx;
}
