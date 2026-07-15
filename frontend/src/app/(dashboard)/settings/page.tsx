"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiGet, apiPatch } from "@/lib/api";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import Button from "@/components/ui/Button";
import FormCheckbox from "@/components/ui/FormCheckbox";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationPermissionCard from "@/components/notifications/NotificationPermissionCard";
import ReminderStatusCard from "@/components/notifications/ReminderStatusCard";

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

  const { settings, updateNotificationSettings, loading: notifLoading } = useNotifications();
  const [notifState, setNotifState] = useState(settings);

  useEffect(() => {
    setNotifState(settings);
  }, [settings]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("activity_token");
        const result = await apiGet<ProfileResponse>("/users/profile", token);

        if (!result.success) {
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
      const result = await apiPatch<ProfileResponse>("/users/profile", profile, token);

      if (!result.success) {
        throw new Error(result.message || "Failed to update profile.");
      }

      await updateNotificationSettings({
        remindersEnabled: notifState.remindersEnabled,
        reminderInterval: notifState.reminderInterval ? Number(notifState.reminderInterval) : null,
        autoMarkMissedEnabled: notifState.autoMarkMissedEnabled,
      });

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

  if (loading || notifLoading) {
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

      <NotificationPermissionCard />
      
      <ReminderStatusCard 
        remindersEnabled={settings.remindersEnabled}
        reminderInterval={settings.reminderInterval}
        totalTrackedTasks={settings.totalTrackedTasks}
        autoMarkMissedEnabled={settings.autoMarkMissedEnabled}
      />

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-2">Profile & Preferences</h3>
        
        <FormInput
          label="Name"
          value={profile.name}
          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
        />

        <FormInput
          label="Email"
          value={email}
          disabled
          className="text-slate-500"
        />

        <FormSelect
          label="Assistant tone"
          value={profile.assistantTone}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, assistantTone: e.target.value }))
          }
          options={[
            { label: "Motivational", value: "MOTIVATIONAL" },
            { label: "Balanced", value: "BALANCED" },
            { label: "Strict", value: "STRICT" },
            { label: "Savage", value: "SAVAGE" },
          ]}
        />
        
        <div className="border-t border-slate-800 my-4 pt-4">
          <h3 className="text-xl font-semibold text-white mb-4">Notification Settings</h3>
          
          <FormCheckbox 
            label="Enable Reminders"
            checked={notifState.remindersEnabled}
            onChange={(e) => setNotifState((prev) => ({ ...prev, remindersEnabled: e.target.checked }))}
            className="mb-4"
          />

          <FormInput
            label="Default Reminder Interval (minutes)"
            type="number"
            value={notifState.reminderInterval || ""}
            onChange={(e) => setNotifState((prev) => ({ ...prev, reminderInterval: e.target.value ? Number(e.target.value) : null }))}
          />
          
          <FormCheckbox 
            label="Auto-mark missed tasks"
            checked={notifState.autoMarkMissedEnabled}
            onChange={(e) => setNotifState((prev) => ({ ...prev, autoMarkMissedEnabled: e.target.checked }))}
            className="mt-4"
          />
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

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save settings"}
        </Button>
      </form>
    </section>
  );
}