import { linearSearchGenerator } from "@/examples/linearSearch";
import { slidingWindowGenerator } from "@/examples/slidingWindow";
import { twoPointerGenerator } from "@/examples/twoPointers";
import type { Step } from "@/types/algorithm";

export type AlgorithmKey = "linear-search" | "two-pointers" | "sliding-window";

type AlgorithmGenerator = (array: number[], target: number) => Step[];

export type AlgorithmDefinition = {
  key: AlgorithmKey;
  label: string;
  description: string;
  generator: AlgorithmGenerator;
};

export const ALGORITHM_DEFINITIONS: Record<AlgorithmKey, AlgorithmDefinition> = {
  "linear-search": {
    key: "linear-search",
    label: "Linear Search",
    description: "Checks each element one by one to find the target value.",
    generator: linearSearchGenerator,
  },
  "two-pointers": {
    key: "two-pointers",
    label: "Two Pointers",
    description: "Moves two indices from both ends to find a pair matching the target sum.",
    generator: twoPointerGenerator,
  },
  "sliding-window": {
    key: "sliding-window",
    label: "Sliding Window",
    description: "Finds a contiguous subarray whose sum equals the target using a dynamic window.",
    generator: slidingWindowGenerator,
  },
};

export const ALGORITHM_ORDER: AlgorithmKey[] = [
  "linear-search",
  "two-pointers",
  "sliding-window",
];
