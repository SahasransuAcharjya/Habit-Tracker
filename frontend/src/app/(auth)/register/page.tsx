"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { apiPost } from "@/lib/api";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import Button from "@/components/ui/Button";

type RegisterResponse = {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      assistantTone?: string;
    };
  };
};

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    assistantTone: "BALANCED",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useAuthContext();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setError("");
    setSuccessMessage("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const result = await apiPost<RegisterResponse>("/auth/register", formData);

      if (!result.success) {
        throw new Error(result.message || "Registration failed.");
      }

      if (result.data?.token) {
        login(result.data.token, result.data.user);
      }

      setSuccessMessage(result.message || "Account created successfully.");
      router.push("/tasks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">Activity Assistant</p>
          <h1 className="mt-2 text-3xl font-bold">Register</h1>
          <p className="mt-2 text-sm text-slate-400">
            Create your personal accountability assistant.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <FormSelect
            label="Assistant tone"
            id="assistantTone"
            name="assistantTone"
            value={formData.assistantTone}
            onChange={handleChange}
            options={[
              { label: "Motivational", value: "MOTIVATIONAL" },
              { label: "Balanced", value: "BALANCED" },
              { label: "Strict", value: "STRICT" },
              { label: "Savage", value: "SAVAGE" },
            ]}
          />

          {error ? (
            <div className="rounded-xl border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          {successMessage ? (
            <div className="rounded-xl border border-emerald-800 bg-emerald-950/50 px-4 py-3 text-sm text-emerald-300">
              {successMessage}
            </div>
          ) : null}

          <Button type="submit" disabled={loading} fullWidth>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}