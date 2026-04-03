import type { Step } from "@/types/algorithm";

type ArrayVisualizerProps = {
  step: Step;
};

export function ArrayVisualizer({ step }: Readonly<ArrayVisualizerProps>) {
  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold leading-tight tracking-tight" style={{ color: "var(--primary)" }}>
        Array Structure
      </h2>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {step.array.map((num, index) => {
          const isActive = step.activeIndices.includes(index);
          const isFoundAtIndex = isActive && step.isMatched;
          let boxBorderColor = "var(--border)";

          if (isActive) {
            boxBorderColor = "var(--primary)";
          }

          if (isFoundAtIndex) {
            boxBorderColor = "var(--approved)";
          }

          return (
            <div
              key={`${num}-${index}`}
              className="flex h-12 w-12 items-center justify-center rounded-lg border text-base font-semibold transition-transform duration-200 hover:scale-105"
              style={{
                backgroundColor: "var(--background)",
                borderColor: boxBorderColor,
                color: "var(--primary)",
              }}
            >
              {num}
            </div>
          );
        })}
      </div>

      <p
        className="mt-6 max-w-prose text-base leading-7 wrap-break-word"
        style={{ color: "var(--muted-foreground)" }}
      >
        {step.message || "Starting search"}
      </p>
    </>
  );
}
