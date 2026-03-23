"use client";

import { use, useMemo, useState } from "react";
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

  const handlePrev = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  function commitInputs() {
  const parsed = draftArray
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number);

    const parsedTarget = Number(draftTarget.trim());
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
            <Input
            type="text"
            required
            value={draftArray}
            onChange={(e) => setDraftArray(e.target.value)}>
            </Input>

            <Input
            type="text"
            required
            value={draftTarget}
            onChange={(e) => setDraftTarget(e.target.value)}>
            </Input>

            <Button
            onClick={commitInputs}>Done</Button>
            
          </div>
        </div>
      </main>
    </div>
  );
}
