import type { Step } from "../types/algorithm";

/**
 * Function to do a Linear Search before implementing anything
 * 
 */

export function linearSearch(array: number[], activeIndices: number[], message: string): Step {
    return {
        array: array,
        activeIndices: activeIndices,
        message: message,
    };
}

export const ArrayStep: Step = linearSearch(
    [5,3,1],
    [0],
    "Step 1,"
);





