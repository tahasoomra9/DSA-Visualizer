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
}: Readonly<StepControlsProps>) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        type="button"
        onClick={onPrev}
        disabled={stepIndex === 0}
        variant="outline"
        size="lg"
        className="min-w-24"
      >
        Previous
      </Button>

      <Button
        type="button"
        onClick={onNext}
        disabled={stepIndex === totalSteps - 1}
        variant="secondary"
        size="lg"
        className="min-w-24"
      >
        Next
      </Button>

      <p className="w-full text-sm leading-6 text-muted-foreground sm:w-auto">
        Step {stepIndex + 1} of {totalSteps}
      </p>
    </div>
  );
}
