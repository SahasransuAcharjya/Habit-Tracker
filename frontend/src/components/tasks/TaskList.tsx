import TaskCard from "./TaskCard";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  status?: "PENDING" | "DONE" | "MISSED" | "SKIPPED";
  startTime?: string | null;
  endTime?: string | null;
};

type TaskListProps = {
  tasks: Task[];
  onComplete?: (taskId: string) => void;
  onSkip?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onSelect?: (task: Task) => void;
};

export default function TaskList({
  tasks,
  onComplete,
  onSkip,
  onDelete,
  onSelect,
}: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-sm text-slate-400">
        No tasks found for the selected filters.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          onSkip={onSkip}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}