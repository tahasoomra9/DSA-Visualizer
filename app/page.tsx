"use client";

import { useMemo, useState } from "react";
import { linearSearchGenerator } from "../examples/linearSearch";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";


export default function Home() {
  const [draftArray, setDraftArray] = useState('8,4,2,1,7');
  const [draftTarget, setDraftTarget] = useState('7');
  const[FinalArray, setFinalArray] = useState<number[]>([8,4,2,1,7]);
  const[finalTarget, setFinalTarget] = useState<number>(7);
  const [stepIndex, setStepIndex] = useState(0);


  const steps = useMemo(() => linearSearchGenerator(FinalArray, finalTarget), [FinalArray, finalTarget]);
  const currentStep = steps[stepIndex];

  const isArrayValid = useMemo(() => {
    const raw = draftArray
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (raw.length === 0) {
      return false;
    }

    const parsed = raw.map(Number);
    return !parsed.some((n) => Number.isNaN(n));
  }, [draftArray]);

  const isTargetValid = useMemo(() => {
    const parsedTarget = Number(draftTarget.trim());
    return !Number.isNaN(parsedTarget);
  }, [draftTarget]);

  const isInputValid = isArrayValid && isTargetValid;

  const handlePrev = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  function commitInputs() {
  const raw = draftArray
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

    if (raw.length === 0) {
      return
    }
    const parsed = raw.map(Number)


    if (parsed.some(n => Number.isNaN(n))) {
      return;
    }
    
    const parsedTarget = Number(draftTarget.trim());
    if (Number.isNaN(parsedTarget)) {
      return;
    }
    setFinalArray(parsed);
    setFinalTarget(parsedTarget);
    setStepIndex(0);

  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-3xl w-full">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--primary)" }}>
            Linear Search Visualizer
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
            Linear Search Based Algorithm
          </p>

          <div className="mb-6 flex flex-wrap items-center gap-3 cursor-pointer">
            <Button
              type="button"
              onClick={handlePrev}
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
              onClick={handleNext}
              disabled={stepIndex === steps.length - 1}
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
              Step {stepIndex + 1} of {steps.length}
            </p>
          </div>
          
          <div 
            className="p-8 rounded-xl border-2"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--primary)" }}> 
              Array Structure
            </h2>
            <div className="flex gap-2 flex-wrap">
              {currentStep.array.map((num, index) => {
                const isActive = currentStep.activeIndices.includes(index);
                const isFoundAtIndex = currentStep.isMatched && isActive && num === currentStep.target;
                let boxBorderColor = "var(--border)";
                const boxBackgroundColor = "var(--background)";
                const boxTextColor = "var(--primary)";

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
                      backgroundColor: boxBackgroundColor,
                      borderColor: boxBorderColor,
                      color: boxTextColor,
                    }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-base" style={{ color: "var(--muted-foreground)" }}>
              {currentStep.message || "Starting search"}
            </p>
            <div className="mt-8 space-y-4 rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-base font-semibold" style={{ color: "var(--primary)" }}>
                Input Settings
              </h3>

              <div className="space-y-1.5">
                <label htmlFor="example-array" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Example Array
                </label>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Enter numbers separated by commas, e.g. 8,4,2,1,7
                </p>
                <Input
                  id="example-array"
                  type="text"
                  required
                  value={draftArray}
                  aria-invalid={!isArrayValid}
                  placeholder="8,4,2,1,7"
                  onChange={(e) => setDraftArray(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="target-value" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Target Value
                </label>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Enter one number to search for, e.g. 7
                </p>
                <Input
                  id="target-value"
                  type="text"
                  required
                  value={draftTarget}
                  aria-invalid={!isTargetValid}
                  placeholder="7"
                  onChange={(e) => setDraftTarget(e.target.value)}
                />
              </div>

              <Button
                disabled={!isInputValid}
                className="mt-1 w-full sm:w-auto"
                style={{
                  backgroundColor: isInputValid ? "var(--primary)" : "var(--muted)",
                  color: isInputValid ? "var(--primary-foreground)" : "var(--muted-foreground)",
                }}
                onClick={commitInputs}
              >
                Done
              </Button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
