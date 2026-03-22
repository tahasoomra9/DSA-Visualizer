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

export const ArrayStep: Step = linearSearch(
    [5,3,1,1,6,12,5],
    [0],
    1,
    "Step"
);





