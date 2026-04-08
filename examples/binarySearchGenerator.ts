import type { Step } from "@/types/algorithm";

type BinaryComparison = NonNullable<Step["comparison"]>;

type BinaryStepPayload = {
    array: number[];
    activeIndex: number;
    target: number;
    message: string;
    isMatched: boolean;
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