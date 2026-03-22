import type { Step } from "../types/algorithm";

/**
 * Function to do a Linear Search before implementing anything
 * 
 */

export function linearSearch(array: number[], activeIndices: number[], target: number, message: string): Step {
    return {
        array: array,
        activeIndices: activeIndices,
        message: message,
        target: target
    };
}

export const ArrayStep1: Step = linearSearch(
    [5,3,1],
    [0],
    1,
    "Step 1: index pointer at 0 where 5 != target(1)"
);

export const ArrayStep2: Step = linearSearch(
    [5,3,1],
    [1],
    1,
    "Step 2: index pointer at 1 where 3 != target (1)"
);

export const ArrayStep3: Step = linearSearch(
    [5,3,1],
    [2],
    1,
    "Step 3: index pointer at 2 where 1 == target (1), Target Found at index(2)!"
);





