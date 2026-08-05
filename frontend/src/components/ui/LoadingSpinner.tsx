type LoadingSpinnerProps = {
  text?: string;
};

export default function LoadingSpinner({
  text = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-stone-600">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-red-400" />
      <p className="text-sm">{text}</p>
    </div>
  );
}