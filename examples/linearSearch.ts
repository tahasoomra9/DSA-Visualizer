import type { Step } from "../types/algorithm";

/**
 * Function to do a Linear Search before implementing anything
 * 
 */

function createStep(
    array: number[],
    activeIndex: number,
    target: number,
    message: string,
    isMatched: boolean
):Step{
    return{
        array: [...array],
        activeIndices: [activeIndex],
        target,
        message,
        isMatched,
    }
};

export function linearSearchGenerator(arrayToSearch: number[], targetValue: number): Step[] {
    const step :Step[] = [];
    
    step.push(createStep(arrayToSearch, -1, targetValue, "", false));

    for (let i = 0; i < arrayToSearch.length; i += 1) {
        const currNum = arrayToSearch[i];
        let ArrayMessage = `Checking element ${currNum} at index ${i}`;
        let isMatched = false;

        if (currNum === targetValue) {
            ArrayMessage = `Target found at index ${i}`;
            isMatched = true;
            step.push(createStep(arrayToSearch, i, targetValue, ArrayMessage, isMatched));
            return step;
        }
        step.push(createStep(arrayToSearch, i, targetValue, ArrayMessage, isMatched));

    }

    step.push(createStep(arrayToSearch, -1, targetValue, `Target Value ${targetValue} not found in array`, false));
    return step;

}