import { linearSearchGenerator } from "@/examples/linearSearch";
import { twoPointerGenerator } from "@/examples/twoPointers";
import type { Step } from "@/types/algorithm";

export type AlgorithmKey = "linear-search" | "two-pointers";

type AlgorithmGenerator = (array: number[], target: number) => Step[];

export type AlgorithmDefinition = {
  key: AlgorithmKey;
  label: string;
  generator: AlgorithmGenerator;
};

export const ALGORITHM_DEFINITIONS: Record<AlgorithmKey, AlgorithmDefinition> = {
  "linear-search": {
    key: "linear-search",
    label: "Linear Search",
    generator: linearSearchGenerator,
  },
  "two-pointers": {
    key: "two-pointers",
    label: "Two Pointers",
    generator: twoPointerGenerator,
  },
};

export const ALGORITHM_ORDER: AlgorithmKey[] = ["linear-search", "two-pointers"];
