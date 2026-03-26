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
    const steps :Step[] = [];
    
    steps.push(createStep(arrayToSearch, -1, targetValue, "", false));

    for (let i = 0; i < arrayToSearch.length; i += 1) {
        const currNum = arrayToSearch[i];
        let message = `Checking element ${currNum} at index ${i}`;
        let isMatched = false;

        if (currNum === targetValue) {
            message = `Target found at index ${i}`;
            isMatched = true;
            steps.push(createStep(arrayToSearch, i, targetValue, message, isMatched));
            return steps;
        }
        steps.push(createStep(arrayToSearch, i, targetValue, message, isMatched));

    }

    steps.push(createStep(arrayToSearch, -1, targetValue, `Target Value ${targetValue} not found in array`, false));
    return steps;

}