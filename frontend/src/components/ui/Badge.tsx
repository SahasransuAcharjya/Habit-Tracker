import { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

type BadgeSize = "sm" | "md" | "lg";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-stone-100 text-foreground",
  success: "bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/20",
  warning: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/20",
  danger: "bg-primary-500/15 text-primary-300 ring-1 ring-primary-500/20",
  info: "bg-primary-500/15 text-primary-600 ring-1 ring-primary-500/20",
  outline: "border border-border bg-transparent text-foreground",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-1 text-[10px]",
  md: "px-3 py-1 text-xs",
  lg: "px-3.5 py-1.5 text-sm",
};

const dotClasses: Record<BadgeVariant, string> = {
  default: "bg-slate-300",
  success: "bg-sky-600",
  warning: "bg-amber-300",
  danger: "bg-primary-300",
  info: "bg-primary-600",
  outline: "bg-slate-300",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-medium tracking-wide ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {dot ? <span className={`h-2 w-2 rounded-full ${dotClasses[variant]}`} /> : null}
      <span>{children}</span>
    </span>
  );
}