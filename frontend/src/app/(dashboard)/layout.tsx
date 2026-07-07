"use client";

import { ReactNode } from "react";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";
import { useAuthContext } from "@/context/AuthContext";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuthContext();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-950 text-white">
        <DashboardSidebar userName={user?.name || "User"} />
        <div className="flex flex-1 flex-col pb-16 lg:pb-0">
          <DashboardTopbar />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
        <MobileBottomNav />
      </div>
    </ProtectedRoute>
  );
}