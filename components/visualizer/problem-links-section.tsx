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
      className="mt-8 overflow-hidden rounded-2xl border p-4 sm:p-6"
      style={{
        backgroundColor: "var(--background)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mb-5 flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="min-w-0 space-y-1">
          <h2
            className="text-lg font-semibold tracking-tight sm:text-xl"
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
            className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 rounded-xl border px-4 py-4 transition-colors hover:bg-white/5"
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
