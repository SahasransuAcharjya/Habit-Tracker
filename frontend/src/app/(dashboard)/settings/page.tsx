"use client";

import { FormEvent, useEffect, useState } from "react";

type Profile = {
  id?: string;
  name?: string;
  email?: string;
  assistantTone?: string;
};

type ProfileResponse = {
  success: boolean;
  message: string;
  data: Profile;
};

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "",
    assistantTone: "BALANCED",
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("activity_token");

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result: ProfileResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch profile.");
        }

        setProfile({
          name: result.data.name || "",
          assistantTone: result.data.assistantTone || "BALANCED",
        });
        setEmail(result.data.email || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("activity_token");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const result: ProfileResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update profile.");
      }

      setSuccessMessage(result.message || "Settings updated.");
      localStorage.setItem(
        "activity_user",
        JSON.stringify({
          ...(JSON.parse(localStorage.getItem("activity_user") || "{}")),
          name: result.data.name || profile.name,
          assistantTone: result.data.assistantTone || profile.assistantTone,
          email,
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
        Loading settings...
      </section>
    );
  }

  return (
    <section className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="mt-1 text-sm text-slate-400">
          Adjust your profile and assistant tone.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Name</label>
          <input
            value={profile.name}
            onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">Email</label>
          <input
            value={email}
            disabled
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Assistant tone
          </label>
          <select
            value={profile.assistantTone}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, assistantTone: e.target.value }))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
          >
            <option value="MOTIVATIONAL">Motivational</option>
            <option value="BALANCED">Balanced</option>
            <option value="STRICT">Strict</option>
            <option value="SAVAGE">Savage</option>
          </select>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-xl border border-emerald-800 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
            {successMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save settings"}
        </button>
      </form>
    </section>
  );
}