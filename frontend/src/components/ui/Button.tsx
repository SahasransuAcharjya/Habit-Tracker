import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-red-500 text-white hover:bg-red-400 hover:shadow-lg hover:shadow-red-500/30",
  secondary: "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm",
  danger: "bg-red-600 text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-600/30",
  ghost: "text-stone-700 hover:bg-stone-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`rounded-xl font-semibold transition-all duration-300 ease-out hover:-translate-y-[1px] active:scale-[0.98] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100 disabled:hover:shadow-none ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}