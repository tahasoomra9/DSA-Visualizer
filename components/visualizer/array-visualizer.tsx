import type { Step } from "@/types/algorithm";

type ArrayVisualizerProps = {
  step: Step;
};

export function ArrayVisualizer({ step }: Readonly<ArrayVisualizerProps>) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--primary)" }}>
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
              className="w-12 h-12 flex items-center justify-center rounded-xl border-2 font-semibold transition-all hover:scale-110"
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
        className="mt-6 max-w-prose text-base leading-relaxed wrap-break-word"
        style={{ color: "var(--muted-foreground)" }}
      >
        {step.message || "Starting search"}
      </p>
    </>
  );
}
