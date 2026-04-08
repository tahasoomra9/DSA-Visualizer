import { Step } from "@/types/algorithm"


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

export function binarySearchGenerator(arr: number[], target: number): Step[] {
    const steps: Step[] = [];

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Current step
        steps.push(
            createStep(
                arr,
                mid,
                target,
                `Checking middle index ${mid} (value: ${arr[mid]})`,
                arr[mid] === target
            )
        );

        if (arr[mid] === target) {
            steps.push(
                createStep(
                    arr,
                    mid,
                    target,
                    "Target found",
                    true
                )
            );
            return steps;
        }

        if (arr[mid] < target) {
            steps.push(
                createStep(
                    arr,
                    mid,
                    target,
                    `Value is smaller than target → searching right half`,
                    false
                )
            );
            left = mid + 1;
        } else {
            steps.push(
                createStep(
                    arr,
                    mid,
                    target,
                    `Value is greater than target → searching left half`,
                    false
                )
            );
            right = mid - 1;
        }
    }

    // Not found
    steps.push(
        createStep(
            arr,
            -1,
            target,
            "Target not found",
            false
        )
    );

    return steps;
}