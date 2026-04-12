import type { Step } from "@/types/algorithm";
export type BinarySearchProblem = {
    name: string,
    difficulty: "Easy" | "Medium" | "Hard";
    link: string;
}

export const BINARY_SEARCH_DIFFICULTY_COLORS: Record<BinarySearchProblem["difficulty"], string> ={
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
}

export const BINARY_SEARCH_PROBLEMS = [
  // Easy
  {
    name: "Binary Search",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-search/"
  },
  {
    name: "Search Insert Position",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/search-insert-position/"
  },
  {
    name: "First Bad Version",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/first-bad-version/"
  },
  {
    name: "Sqrt(x)",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/sqrtx/"
  },
  {
    name: "Valid Perfect Square",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-perfect-square/"
  },
  {
    name: "Arranging Coins",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/arranging-coins/"
  },
  {
    name: "Guess Number Higher or Lower",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/guess-number-higher-or-lower/"
  },

  // Medium
  {
    name: "Find First and Last Position of Element in Sorted Array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
  },
  {
    name: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  },
  {
    name: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/"
  },
  {
    name: "Peak Index in a Mountain Array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/peak-index-in-a-mountain-array/"
  },
  {
    name: "Find Peak Element",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/find-peak-element/"
  },
  {
    name: "Search a 2D Matrix",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/search-a-2d-matrix/"
  },
  {
    name: "Search a 2D Matrix II",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/search-a-2d-matrix-ii/"
  },
  {
    name: "Koko Eating Bananas",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/koko-eating-bananas/"
  },
  {
    name: "Capacity To Ship Packages Within D Days",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/"
  },
  {
    name: "Find the Smallest Divisor Given a Threshold",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/"
  },

  // Hard
  {
    name: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  },
  {
    name: "Search in Rotated Sorted Array II",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/"
  },
  {
    name: "Split Array Largest Sum",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/split-array-largest-sum/"
  },
  {
    name: "Find in Mountain Array",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/find-in-mountain-array/"
  },
  {
    name: "Kth Smallest Element in a Sorted Matrix",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/"
  }
];


type BinaryComparison = NonNullable<Step["comparison"]>;

type BinaryStepPayload = {
    array: number[];
    activeIndex: number;
    target: number;
    message: string;
    isMatched: boolean;
    currentLine: number;
    low: number;
    mid: number;
    high: number;
    activeRange: [number, number] | null;
    eliminatedIndices: number[];
    comparison: BinaryComparison;
};

type DecisionState = {
    low: number;
    high: number;
    eliminatedIndices: number[];
    decisionStep: Step;
};

function createRange(start: number, end: number): number[] {
    if (start > end) {
        return [];
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function createStep({
    array,
    activeIndex,
    target,
    message,
    isMatched,
    currentLine,
    low,
    mid,
    high,
    activeRange,
    eliminatedIndices,
    comparison,
}: Readonly<BinaryStepPayload>): Step {
    return {
        array: [...array],
        activeIndices: activeIndex >= 0 ? [activeIndex] : [],
        target,
        message,
        isMatched,
        currentLine,
        low,
        mid,
        high,
        activeRange,
        eliminatedIndices: [...eliminatedIndices],
        comparison,
    };
}

function mergeEliminatedIndices(existing: number[], next: number[]): number[] {
    return [...new Set([...existing, ...next])].sort((a, b) => a - b);
}

function getComparison(midValue: number, target: number): BinaryComparison {
    if (midValue === target) {
        return "equal";
    }

    if (midValue < target) {
        return "less-than-target";
    }

    return "greater-than-target";
}

function getActiveRange(low: number, high: number): [number, number] | null {
    if (low <= high) {
        return [low, high];
    }

    return null;
}

function buildMoveLowState({
    array,
    target,
    low,
    mid,
    high,
    midValue,
    eliminatedIndices,
}: {
    array: number[];
    target: number;
    low: number;
    mid: number;
    high: number;
    midValue: number;
    eliminatedIndices: number[];
}): DecisionState {
    const nextLow = mid + 1;
    const nextEliminated = mergeEliminatedIndices(eliminatedIndices, createRange(low, mid));

    return {
        low: nextLow,
        high,
        eliminatedIndices: nextEliminated,
        decisionStep: createStep({
            array,
            activeIndex: mid,
            target,
            message: `${midValue} < ${target}, eliminate left half and move low to ${nextLow}.`,
            isMatched: false,
            currentLine: 8,
            low: nextLow,
            mid,
            high,
            activeRange: getActiveRange(nextLow, high),
            eliminatedIndices: nextEliminated,
            comparison: "less-than-target",
        }),
    };
}

function buildMoveHighState({
    array,
    target,
    low,
    mid,
    high,
    midValue,
    eliminatedIndices,
}: {
    array: number[];
    target: number;
    low: number;
    mid: number;
    high: number;
    midValue: number;
    eliminatedIndices: number[];
}): DecisionState {
    const nextHigh = mid - 1;
    const nextEliminated = mergeEliminatedIndices(eliminatedIndices, createRange(mid, high));

    return {
        low,
        high: nextHigh,
        eliminatedIndices: nextEliminated,
        decisionStep: createStep({
            array,
            activeIndex: mid,
            target,
            message: `${midValue} > ${target}, eliminate right half and move high to ${nextHigh}.`,
            isMatched: false,
            currentLine: 9,
            low,
            mid,
            high: nextHigh,
            activeRange: getActiveRange(low, nextHigh),
            eliminatedIndices: nextEliminated,
            comparison: "greater-than-target",
        }),
    };
}

export function binarySearchGenerator(arr: number[], target: number): Step[] {
    const sortedArray = [...arr].sort((a, b) => a - b);
    const steps: Step[] = [];
    const wasUnsorted = arr.some((value, index) => value !== sortedArray[index]);

    if (sortedArray.length === 0) {
        steps.push(
            createStep({
                array: sortedArray,
                activeIndex: -1,
                target,
                message: "Array is empty",
                isMatched: false,
                currentLine: 11,
                low: 0,
                mid: -1,
                high: -1,
                activeRange: null,
                eliminatedIndices: [],
                comparison: "not-found",
            })
        );
        return steps;
    }

    let low = 0;
    let high = sortedArray.length - 1;
    let eliminatedIndices: number[] = [];

    if (wasUnsorted) {
        steps.push(
            createStep({
                array: sortedArray,
                activeIndex: -1,
                target,
                message: "Binary search requires sorted input, so the array is shown in ascending order.",
                isMatched: false,
                currentLine: 2,
                low,
                mid: -1,
                high,
                activeRange: [low, high],
                eliminatedIndices,
                comparison: "init",
            })
        );
    }

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const midValue = sortedArray[mid];
        const comparison = getComparison(midValue, target);

        steps.push(
            createStep({
                array: sortedArray,
                activeIndex: mid,
                target,
                message: `mid = floor((${low} + ${high}) / 2) = ${mid}. Compare ${midValue} with ${target}.`,
                isMatched: midValue === target,
                currentLine: 6,
                low,
                mid,
                high,
                activeRange: [low, high],
                eliminatedIndices,
                comparison,
            })
        );

        if (comparison === "equal") {
            steps.push(
                createStep({
                    array: sortedArray,
                    activeIndex: mid,
                    target,
                    message: `Target found at index ${mid}.`,
                    isMatched: true,
                    currentLine: 7,
                    low,
                    mid,
                    high,
                    activeRange: [low, high],
                    eliminatedIndices,
                    comparison: "equal",
                })
            );
            return steps;
        }

        const decisionState =
            comparison === "less-than-target"
                ? buildMoveLowState({
                    array: sortedArray,
                    target,
                    low,
                    mid,
                    high,
                    midValue,
                    eliminatedIndices,
                })
                : buildMoveHighState({
                    array: sortedArray,
                    target,
                    low,
                    mid,
                    high,
                    midValue,
                    eliminatedIndices,
                });

        steps.push(decisionState.decisionStep);
        low = decisionState.low;
        high = decisionState.high;
        eliminatedIndices = decisionState.eliminatedIndices;
    }

    steps.push(
        createStep({
            array: sortedArray,
            activeIndex: -1,
            target,
            message: `Target ${target} is not in the array.`,
            isMatched: false,
            currentLine: 11,
            low,
            mid: -1,
            high,
            activeRange: null,
            eliminatedIndices: createRange(0, sortedArray.length - 1),
            comparison: "not-found",
        })
    );

    return steps;
}