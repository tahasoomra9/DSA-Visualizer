"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { StepControls } from "@/components/visualizer/step-controls";
import { ArrayVisualizer } from "@/components/visualizer/array-visualizer";
import { InputSettings } from "@/components/visualizer/input-settings";
import { ProblemLinksSection } from "@/components/visualizer/problem-links-section";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ALGORITHM_DEFINITIONS, type AlgorithmKey } from "@/lib/algorithms";
import {
  TWO_POINTERS_DIFFICULTY_COLORS,
  TWO_POINTERS_PROBLEMS,
} from "@/examples/twoPointers";
import { 
  SLIDING_WINDOW_DIFFICULTY_COLORS, 
  SLIDING_WINDOW_PROBLEMS } from "@/examples/slidingWindow";

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

  const problemConfigByConfig = {
    "two-pointers": {
      title: "Two Pointers Problems",
      subtitle: "Practice on LeetCode",
      badgeLabel: "Practice on LeetCode",
      problems: TWO_POINTERS_PROBLEMS,
      difficultyColors: TWO_POINTERS_DIFFICULTY_COLORS,
    },
    "sliding-window": {
      title: "Sliding Window Problems",
      subtitle: "Practice on LeetCode",
      badgeLabel: "Practice on LeetCode",
      problems: SLIDING_WINDOW_PROBLEMS,
      difficultyColors: SLIDING_WINDOW_DIFFICULTY_COLORS,
    },
  };

  const selectedProblemConfig =
    selectedAlgorithm in problemConfigByConfig
      ? problemConfigByConfig[
          selectedAlgorithm as keyof typeof problemConfigByConfig
        ]
      : undefined;

  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar": "var(--background)",
            "--sidebar-foreground": "var(--foreground)",
            "--sidebar-border": "var(--border)",
            "--sidebar-accent": "var(--background)",
            "--sidebar-accent-foreground": "var(--foreground)",
            "--sidebar-primary": "var(--foreground)",
            "--sidebar-primary-foreground": "var(--background)",
          } as CSSProperties
        }
      >
        <AppSidebar
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmSelect={handleAlgorithmSelect}
        />

        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>DSA Wizard</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeAlgorithm.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex-1 min-w-0 flex items-start justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div className="w-full max-w-4xl space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1
              className="text-3xl font-bold leading-tight sm:text-4xl wrap-break-word"
              style={{ color: "var(--primary)" }}
            >
            {activeAlgorithm.label} Visualizer
            </h1>
            <p
              className="max-w-prose text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--muted-foreground)" }}
            >
            {activeAlgorithm.description}
            </p>
          </div>

          <StepControls
            stepIndex={stepIndex}
            totalSteps={steps.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          <div
            className="rounded-xl border-2 p-4 sm:p-6 lg:p-8"
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

          {selectedProblemConfig && (
            <ProblemLinksSection
              title={selectedProblemConfig.title}
              subtitle={selectedProblemConfig.subtitle}
              badgeLabel={selectedProblemConfig.badgeLabel}
              problems={selectedProblemConfig.problems}
              difficultyColors={selectedProblemConfig.difficultyColors}
            />
          )}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
