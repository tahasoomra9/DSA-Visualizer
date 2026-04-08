export type BinaryComparison =
    | "init"
    | "less-than-target"
    | "greater-than-target"
    | "equal"
    | "not-found";

export type Step = {
    array: number[];
    activeIndices: number[];
    message: string;
    target: number;
    isMatched: boolean;
    low?: number;
    mid?: number;
    high?: number;
    activeRange?: [number, number] | null;
    eliminatedIndices?: number[];
    comparison?: BinaryComparison;
};