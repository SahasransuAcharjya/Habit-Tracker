export function validateEmail(email: string) {
  if (!email.trim()) {
    return "Email is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Enter a valid email address.";
  }

  return "";
}

export function validatePassword(password: string) {
  if (!password.trim()) {
    return "Password is required.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return "";
}

export function validateRequired(value: string, fieldName: string) {
  if (!value.trim()) {
    return `${fieldName} is required.`;
  }

  return "";
}

export function validateReminderInterval(value: string) {
  if (!value.trim()) return "";

  const numericValue = Number(value);

  if (Number.isNaN(numericValue) || numericValue <= 0) {
    return "Reminder interval must be a positive number.";
  }

  return "";
}