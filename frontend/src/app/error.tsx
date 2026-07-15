"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ErrorMessage message="Something went wrong!" />
        <div className="mt-4 flex justify-center">
          <Button onClick={() => reset()} variant="secondary">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
