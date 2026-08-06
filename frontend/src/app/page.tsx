import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fdfaf6] text-stone-800">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-red-400">
            Personal Accountability App
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
            Schedule your day, track your work, and face your report card honestly.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-stone-600 md:text-lg">
            Activity Assistant helps you manage tasks, recurring habits, reminders,
            end-of-day feedback, and performance reports from one clean mobile-friendly
            dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-[550ms] ease-out hover:-translate-y-[1px] hover:bg-red-400 hover:shadow-lg hover:shadow-red-500/30 active:scale-[0.98] active:translate-y-0"
            >
              Get started
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition-all duration-[550ms] ease-out hover:-translate-y-[1px] hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm active:scale-[0.98] active:translate-y-0"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <h2 className="text-lg font-semibold">Plan properly</h2>
            <p className="mt-2 text-sm text-stone-500">
              Create tasks, add deadlines, define reminders, and organize recurring work.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <h2 className="text-lg font-semibold">Track daily effort</h2>
            <p className="mt-2 text-sm text-stone-500">
              Mark tasks complete or skipped and keep a visible record of your actual effort.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <h2 className="text-lg font-semibold">Get real feedback</h2>
            <p className="mt-2 text-sm text-stone-500">
              Generate report cards with motivation, praise, or a reality check when needed.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}