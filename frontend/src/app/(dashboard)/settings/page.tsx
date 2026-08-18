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
import { useTheme } from "@/context/ThemeContext";
import ClockFaceSelector from "@/components/settings/ClockFaceSelector";

type Profile = {
  id?: string;
  name?: string;
  email?: string;
  assistantTone?: string;
  notificationSound?: string;
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
    notificationSound: "bell",
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { settings, updateNotificationSettings, loading: notifLoading } = useNotifications();
  const [notifState, setNotifState] = useState(settings);
  const { mode, color, setMode, setColor } = useTheme();

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

        const savedSound = localStorage.getItem("activity_notification_sound") || "bell";

        setProfile({
          name: result.data.name || "",
          assistantTone: result.data.assistantTone || "BALANCED",
          notificationSound: savedSound,
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
      
      // Separate notificationSound so we don't send it to the backend
      const { notificationSound, ...apiPayload } = profile;
      
      const result = await apiPatch<ProfileResponse>("/users/profile", apiPayload, token);

      if (!result.success) {
        throw new Error(result.message || "Failed to update profile.");
      }

      await updateNotificationSettings({
        remindersEnabled: notifState.remindersEnabled,
        reminderInterval: notifState.reminderInterval ? Number(notifState.reminderInterval) : null,
        autoMarkMissedEnabled: notifState.autoMarkMissedEnabled,
      });

      // Save notification sound locally
      if (notificationSound) {
        localStorage.setItem("activity_notification_sound", notificationSound);
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

  const playSound = (sound: string) => {
    setProfile(prev => ({ ...prev, notificationSound: sound }));
    localStorage.setItem("activity_notification_sound", sound);
    // In a real implementation we would play the audio file here
  };

  if (loading || notifLoading) {
    return (
      <section className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
        Loading settings...
      </section>
    );
  }

  return (
    <section className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Adjust your profile, theme, and assistant tone.
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
        className="grid gap-4 rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="text-xl font-semibold text-foreground mb-2">Profile & Preferences</h3>
        
        <FormInput
          label="Name"
          value={profile.name}
          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
        />

        <FormInput
          label="Email"
          value={email}
          disabled
          className="text-muted-foreground"
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
        
        <div className="border-t border-border my-4 pt-4">
          <h3 className="text-xl font-semibold text-foreground mb-4">Personalization</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <FormSelect
              label="Theme Mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              options={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ]}
            />
            
            <FormSelect
              label="Color Theme"
              value={color}
              onChange={(e) => setColor(e.target.value as any)}
              options={[
                { label: "Red", value: "red" },
                { label: "Blue", value: "blue" },
                { label: "Green", value: "green" },
              ]}
            />
          </div>

          <div className="mt-4">
            <FormSelect
              label="Notification Sound"
              value={profile.notificationSound}
              onChange={(e) => playSound(e.target.value)}
              options={[
                { label: "Classic Bell", value: "bell" },
                { label: "Soft Chime", value: "chime" },
                { label: "Harp Pluck", value: "harp" },
                { label: "Digital Beep", value: "digital" },
                { label: "Minimal Pop", value: "minimal" },
              ]}
            />
            <p className="mt-1 text-xs text-muted-foreground">Changing the sound will play a preview.</p>
          </div>

          {/* Clock Face */}
          <div className="mt-6 rounded-2xl border border-border bg-background/50 p-4">
            <ClockFaceSelector />
          </div>
        </div>

        <div className="border-t border-border my-4 pt-4">
          <h3 className="text-xl font-semibold text-foreground mb-4">Notification Settings</h3>
          
          <FormCheckbox 
            label="Enable Reminders"
            checked={notifState.remindersEnabled}
            onChange={(checked) => setNotifState((prev) => ({ ...prev, remindersEnabled: checked }))}
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
            onChange={(checked) => setNotifState((prev) => ({ ...prev, autoMarkMissedEnabled: checked }))}
            className="mt-4"
          />
        </div>

        {error ? (
          <div className="rounded-xl border border-primary-800 bg-primary-950/40 px-4 py-3 text-sm text-primary-300">
            {error}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-xl border border-emerald-800 bg-sky-50/40 px-4 py-3 text-sm text-sky-600">
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