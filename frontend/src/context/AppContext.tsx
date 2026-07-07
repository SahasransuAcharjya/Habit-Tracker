"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type AppContextType = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTaskId: string | null;
  setSelectedTaskId: (taskId: string | null) => void;
  selectedHabitId: string | null;
  setSelectedHabitId: (habitId: string | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      selectedDate,
      setSelectedDate,
      selectedTaskId,
      setSelectedTaskId,
      selectedHabitId,
      setSelectedHabitId,
    }),
    [selectedDate, selectedTaskId, selectedHabitId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}