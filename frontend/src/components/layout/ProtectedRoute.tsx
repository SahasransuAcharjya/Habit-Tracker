"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("activity_token");

    if (!token) {
      router.replace(redirectTo);
      setAllowed(false);
      setChecking(false);
      return;
    }

    setAllowed(true);
    setChecking(false);
  }, [router, redirectTo]);

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-300">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />
          <p className="text-sm">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}