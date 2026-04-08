import type { Step } from "@/types/algorithm";
import { cn } from "@/lib/utils";

type ArrayVisualizerProps = {
  step: Step;
  onCellSelect?: (value: number) => void;
};

export function ArrayVisualizer({ step, onCellSelect }: Readonly<ArrayVisualizerProps>) {
  const eliminatedIndicesSet = new Set(step.eliminatedIndices ?? []);
  const hasBinaryMetadata =
    typeof step.low === "number" ||
    typeof step.mid === "number" ||
    typeof step.high === "number";

  const midValue =
    typeof step.mid === "number" && step.mid >= 0 && step.mid < step.array.length
      ? step.array[step.mid]
      : undefined;

  const comparisonSummaryByType: Record<
    NonNullable<Step["comparison"]>,
    string
  > = {
    init: "Initialization",
    "less-than-target": "array[mid] is smaller than target",
    "greater-than-target": "array[mid] is greater than target",
    equal: "array[mid] equals target",
    "not-found": "Search range exhausted",
  };

  const comparisonSummary =
    step.comparison === undefined
      ? "Comparison unavailable"
      : comparisonSummaryByType[step.comparison];

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold leading-tight tracking-tight" style={{ color: "var(--primary)" }}>
        Array Structure
      </h2>

      {hasBinaryMetadata && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <span className="inline-flex items-center rounded border border-sky-200 bg-sky-50 px-2 py-1 font-semibold text-sky-700">
            L = low
          </span>
          <span className="inline-flex items-center rounded border border-indigo-200 bg-indigo-50 px-2 py-1 font-semibold text-indigo-700">
            M = mid
          </span>
          <span className="inline-flex items-center rounded border border-rose-200 bg-rose-50 px-2 py-1 font-semibold text-rose-700">
            H = high
          </span>
          <span className="inline-flex items-center rounded border border-primary/20 bg-primary/10 px-2 py-1">
            highlighted = active range
          </span>
          <span className="inline-flex items-center rounded border border-muted px-2 py-1 opacity-65">
            faded = eliminated
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {step.array.map((num, index) => {
          const isActive = step.activeIndices.includes(index);
          const isMid = step.mid === index;
          const isLow = step.low === index;
          const isHigh = step.high === index;
          const isFoundAtIndex = (isMid || isActive) && step.isMatched;
          const isEliminated = eliminatedIndicesSet.has(index);
          const isInActiveRange =
            step.activeRange !== undefined &&
            step.activeRange !== null &&
            index >= step.activeRange[0] &&
            index <= step.activeRange[1];

          return (
            <button
              type="button"
              key={`${num}-${index}`}
              onClick={() => onCellSelect?.(num)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg p-1 transition-colors duration-200",
                onCellSelect === undefined ? "cursor-default" : "cursor-pointer hover:bg-muted/40"
              )}
              aria-label={`Set target to ${num}`}
            >
              <div className="flex min-h-4 items-center justify-center gap-1">
                {isLow && (
                  <span className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-sky-200 bg-sky-50 px-1 text-[10px] font-semibold leading-none text-sky-700">
                    L
                  </span>
                )}
                {isMid && (
                  <span className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-indigo-200 bg-indigo-50 px-1 text-[10px] font-semibold leading-none text-indigo-700">
                    M
                  </span>
                )}
                {isHigh && (
                  <span className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-rose-200 bg-rose-50 px-1 text-[10px] font-semibold leading-none text-rose-700">
                    H
                  </span>
                )}
              </div>

              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg border text-base font-semibold transition-all duration-200",
                  onCellSelect !== undefined && "hover:scale-105",
                  isInActiveRange && !isEliminated && "bg-primary/10",
                  isEliminated && "opacity-45",
                  isFoundAtIndex && "border-emerald-600 bg-emerald-50 text-emerald-700",
                  !isFoundAtIndex && "bg-background text-primary",
                  isActive && "ring-2 ring-primary/20",
                  !isFoundAtIndex && isLow && "border-sky-500",
                  !isFoundAtIndex && isMid && "border-primary",
                  !isFoundAtIndex && isHigh && "border-rose-500",
                  !isFoundAtIndex && !isLow && !isMid && !isHigh && "border-border"
                )}
              >
                {num}
              </div>

              <span className="text-[10px] leading-none text-muted-foreground">[{index}]</span>
            </button>
          );
        })}
      </div>

      {onCellSelect !== undefined && (
        <p className="mt-3 text-xs leading-5" style={{ color: "var(--muted-foreground)" }}>
          Tip: click any value to set it as target and restart the walkthrough.
        </p>
      )}

      <p
        className="mt-6 max-w-prose text-base leading-7 wrap-break-word"
        style={{ color: "var(--muted-foreground)" }}
      >
        {step.message || "Starting search"}
      </p>

      {hasBinaryMetadata && (
        <div
          className="mt-6 space-y-3 rounded-lg border p-4"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--background)",
          }}
        >
          <h3 className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
            Binary Search Decision
          </h3>

          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            mid = floor((low + high) / 2) = floor((
            {typeof step.low === "number" ? step.low : "-"} + {typeof step.high === "number" ? step.high : "-"}
            ) / 2) = {typeof step.mid === "number" ? step.mid : "-"}
          </p>

          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            Compare: array[mid] = {midValue ?? "-"}, target = {step.target} ({comparisonSummary})
          </p>

          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            Active range: {step.activeRange === null || step.activeRange === undefined
              ? "none"
              : `[${step.activeRange[0]}, ${step.activeRange[1]}]`}
          </p>

          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            Eliminated indices: {(step.eliminatedIndices ?? []).length === 0
              ? "none"
              : (step.eliminatedIndices ?? []).join(", ")}
          </p>
        </div>
      )}
    </>
  );
}
