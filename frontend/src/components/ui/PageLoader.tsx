import LoadingSpinner from "./LoadingSpinner";

type PageLoaderProps = {
  text?: string;
};

export default function PageLoader({
  text = "Loading page...",
}: PageLoaderProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner text={text} />
    </div>
  );
}