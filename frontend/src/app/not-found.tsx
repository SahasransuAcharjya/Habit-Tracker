"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-center">
      <h2 className="text-4xl font-bold text-white">404</h2>
      <p className="mt-2 text-lg text-slate-400">Page not found</p>
      <div className="mt-6">
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
