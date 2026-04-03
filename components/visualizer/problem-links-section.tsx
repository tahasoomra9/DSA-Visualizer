type ProblemLink = {
  name: string;
  difficulty: string;
  link: string;
};

type ProblemLinksSectionProps = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  problems: ProblemLink[];
  difficultyColors: Record<string, string>;
};

export function ProblemLinksSection({
  title,
  subtitle,
  badgeLabel,
  problems,
  difficultyColors,
}: Readonly<ProblemLinksSectionProps>) {
  return (
    <section
      className="mt-10 overflow-hidden rounded-xl border p-6 sm:p-8"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mb-6 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0 space-y-1.5">
          <h2
            className="text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: "var(--primary)" }}
          >
            {title}
          </h2>
          <p className="max-w-prose text-sm leading-6 wrap-break-word" style={{ color: "var(--muted-foreground)" }}>
            {subtitle}
          </p>
        </div>

        <span
          className="inline-flex w-fit shrink-0 self-start rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide sm:self-auto"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted-foreground)",
          }}
        >
          {badgeLabel}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {problems.map((problem) => (
          <a
            key={problem.link}
            href={problem.link}
            target="_blank"
            rel="noreferrer"
            className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 rounded-lg border px-4 py-4 transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="min-w-0 space-y-1">
              <span
                className="block font-medium leading-6 wrap-anywhere"
                style={{ color: "var(--foreground)" }}
              >
                {problem.name}
              </span>
            </div>
            <span className={`shrink-0 ${difficultyColors[problem.difficulty] ?? ""}`}>
              {problem.difficulty}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
