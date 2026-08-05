import { ReactNode } from "react";

type SectionCardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionCard({
  title,
  subtitle,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-2xl border border-stone-200 bg-white p-5 shadow-lg ${className}`}
    >
      {title ? (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-stone-500">{subtitle}</p> : null}
        </div>
      ) : null}

      {children}
    </section>
  );
}