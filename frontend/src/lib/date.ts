export function formatDate(dateString?: string | null) {
  if (!dateString) return "Not available";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateString?: string | null) {
  if (!dateString) return "Not set";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(dateString?: string | null) {
  if (!dateString) return "Not set";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return "Invalid time";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}