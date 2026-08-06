type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="rounded-xl border border-primary-800 bg-primary-950/40 px-4 py-3 text-sm text-primary-300">
      {message}
    </div>
  );
}