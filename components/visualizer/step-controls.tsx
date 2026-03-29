import { Button } from "@/components/ui/button";

type StepControlsProps = {
  stepIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
};

export function StepControls({
  stepIndex,
  totalSteps,
  onPrev,
  onNext,
}: StepControlsProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Button
        type="button"
        onClick={onPrev}
        disabled={stepIndex === 0}
        className="px-4 py-2 rounded-lg border disabled:opacity-50 cursor-pointer"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
        }}
      >
        Previous
      </Button>

      <Button
        type="button"
        onClick={onNext}
        disabled={stepIndex === totalSteps - 1}
        className="px-4 py-2 rounded-lg border disabled:opacity-50 cursor-pointer"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
        }}
      >
        Next
      </Button>

      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
        Step {stepIndex + 1} of {totalSteps}
      </p>
    </div>
  );
}
