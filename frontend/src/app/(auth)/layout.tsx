import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdfaf6] p-4">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 md:p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
}
