"use client";

import { useMemo, useState } from "react";
import { StepControls } from "@/components/visualizer/step-controls";
import { ArrayVisualizer } from "@/components/visualizer/array-visualizer";
import { InputSettings } from "@/components/visualizer/input-settings";
import { AlgorithmSidebar } from "@/components/visualizer/algorithm-sidebar";
import { ALGORITHM_DEFINITIONS, type AlgorithmKey } from "@/lib/algorithms";

export default function Home() {
  const [draftArray, setDraftArray] = useState("8,4,2,1,7");
  const [draftTarget, setDraftTarget] = useState("7");
  const [finalArray, setFinalArray] = useState<number[]>([8, 4, 2, 1, 7]);
  const [finalTarget, setFinalTarget] = useState<number>(7);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>("linear-search");
  const [stepIndex, setStepIndex] = useState(0);

  const activeAlgorithm = ALGORITHM_DEFINITIONS[selectedAlgorithm];

  const steps = useMemo(
    () => activeAlgorithm.generator(finalArray, finalTarget),
    [activeAlgorithm, finalArray, finalTarget]
  );
  const currentStep = steps[stepIndex];

  const handleAlgorithmSelect = (algorithm: AlgorithmKey) => {
    setSelectedAlgorithm(algorithm);
    setStepIndex(0);
  };

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
      return;
    }
    const parsed = raw.map(Number);

    if (parsed.some((n) => Number.isNaN(n))) {
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
    <div className="min-h-screen w-full flex" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <AlgorithmSidebar
        selectedAlgorithm={selectedAlgorithm}
        onSelect={handleAlgorithmSelect}
      />
      <main className="flex-1 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-3xl w-full">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--primary)" }}>
            {activeAlgorithm.label} Visualizer
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--muted-foreground)" }}>
            {activeAlgorithm.description}
          </p>

          <StepControls
            stepIndex={stepIndex}
            totalSteps={steps.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          
          <div 
            className="p-8 rounded-xl border-2"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <ArrayVisualizer step={currentStep} />
            <InputSettings
              draftArray={draftArray}
              draftTarget={draftTarget}
              isArrayValid={isArrayValid}
              isTargetValid={isTargetValid}
              isInputValid={isInputValid}
              onArrayChange={setDraftArray}
              onTargetChange={setDraftTarget}
              onSubmit={commitInputs}
            />
            
          </div>
        </div>
      </main>
    </div>
  );
}
