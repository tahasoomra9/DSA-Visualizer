import type { Step } from "../types/algorithm";

/**
 * Function do to two pointers
 */

function createStep(
    array: number[],
    activeIndex: number[],
    target: number,
    message: string,
    isMatched: boolean
):Step{
    return {
        array: [...array],
        activeIndices: [...activeIndex],
        target,
        message,
        isMatched
    }
};

export function twoPointerGenerator(
  arrayToSearch: number[],
  targetValue: number
): Step[] {
  const sortedArray = [...arrayToSearch].sort((a,b) => a - b);
  const steps: Step[] = [];

  let left = 0;
  let right = sortedArray.length - 1;

  steps.push(
    createStep(
      sortedArray,
      [left, right],
      targetValue,
      "Initialize two pointers, Sorting the Array first",
      false
    )
  );

  while (left < right) {
    const sum = sortedArray[left] + sortedArray[right];

    steps.push(
      createStep(
        sortedArray,
        [left, right],
        targetValue,
        `Checking: ${sortedArray[left]} + ${sortedArray[right]} = ${sum}`,
        false
      )
    );

    if (sum === targetValue) {
      steps.push(
        createStep(
          sortedArray,
          [left, right],
          targetValue,
          "Pair found",
          true
        )
      );
      return steps;
    }

    if (sum < targetValue) {
      steps.push(
        createStep(
          sortedArray,
          [left, right],
          targetValue,
          "Sum too small → move left pointer",
          false
        )
      );
      left++;
    } else {
      steps.push(
        createStep(
          sortedArray,
          [left, right],
          targetValue,
          "Sum too large → move right pointer",
          false
        )
      );
      right--;
    }
  }

  steps.push(
    createStep(
      sortedArray,
      [-1],
      targetValue,
      "No pair found",
      false
    )
  );

  return steps;
}