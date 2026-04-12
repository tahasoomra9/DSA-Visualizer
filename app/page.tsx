
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
import { CodeEditor } from "@/components/CodeEditor";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ALGORITHM_DEFINITIONS, type AlgorithmKey } from "@/lib/algorithms";
import { ALGORITHM_CODE_CONFIGS } from "@/lib/algorithm-code";
import {
  TWO_POINTERS_DIFFICULTY_COLORS,
  TWO_POINTERS_PROBLEMS,
} from "@/examples/twoPointers";
import { 
  SLIDING_WINDOW_DIFFICULTY_COLORS, 
  SLIDING_WINDOW_PROBLEMS } from "@/examples/slidingWindow";
import { LINEAR_SEARCH_DIFFICULTY_COLORS, LINEAR_SEARCH_PROBLEMS } from "@/examples/linearSearch";
import { BINARY_SEARCH_DIFFICULTY_COLORS, BINARY_SEARCH_PROBLEMS } from "@/examples/binarySearchGenerator";

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
  const codeConfig = ALGORITHM_CODE_CONFIGS[selectedAlgorithm];
  const currentCodeLine = codeConfig.getCurrentLine(currentStep);

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

  const handleArrayValueSelect = (value: number) => {
    setDraftTarget(String(value));
    setFinalTarget(value);
    setStepIndex(0);
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
    "linear-search": {
      title: "Linear Search Problems",
      subtitle: "Practice on LeetCode",
      badgeLabel: "Practice on LeetCode",
      problems: LINEAR_SEARCH_PROBLEMS,
      difficultyColors: LINEAR_SEARCH_DIFFICULTY_COLORS,
    },
    "binary-search": {
      title: "Binary Search Problems",
      subtitle: "Practice on LeetCode",
      badgeLabel: "Practice on LeetCode",
      problems: BINARY_SEARCH_PROBLEMS,
      difficultyColors: BINARY_SEARCH_DIFFICULTY_COLORS

    }
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
          <main className="flex-1 min-w-0 flex items-start justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            <div className="w-full max-w-4xl space-y-8 sm:space-y-10">
          <div className="space-y-4">
            <h1
              className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl wrap-break-word"
              style={{ color: "var(--primary)" }}
            >
            {activeAlgorithm.label} Visualizer
            </h1>
            <p
              className="max-w-prose text-base leading-7 sm:text-lg sm:leading-8"
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
            className="rounded-xl border p-6 sm:p-8"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <ArrayVisualizer
              step={currentStep}
              onCellSelect={
                selectedAlgorithm === "binary-search"
                  ? handleArrayValueSelect
                  : undefined
              }
            />
            <CodeEditor
              title={`${activeAlgorithm.label}`}
              code={codeConfig.code}
              language={codeConfig.language}
              currentLine={currentCodeLine}
            />
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