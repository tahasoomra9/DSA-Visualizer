import type { Step } from "../types/algorithm";

export type TwoPointersProblem = {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
};

export const TWO_POINTERS_DIFFICULTY_COLORS: Record<TwoPointersProblem["difficulty"], string> = {
  Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};

export const TWO_POINTERS_PROBLEMS: TwoPointersProblem[] = [
  {
    name: "Valid Palindrome",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-palindrome/",
  },
  {
    name: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
  },
  {
    name: "Remove Element",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/remove-element/",
  },
  {
    name: "Merge Sorted Array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/merge-sorted-array/",
  },
  {
    name: "Reverse String",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/reverse-string/",
  },
  {
    name: "Squares of a Sorted Array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/squares-of-a-sorted-array/",
  },
  {
    name: "Two Sum II - Input Array Is Sorted",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
  },
  {
    name: "Container With Most Water",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/container-with-most-water/",
  },
  {
    name: "3Sum",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/3sum/",
  },
  {
    name: "3Sum Closest",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/3sum-closest/",
  },
  {
    name: "Sort Colors",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/sort-colors/",
  },
  {
    name: "Boats to Save People",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/boats-to-save-people/",
  },
  {
    name: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    name: "Permutation in String",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/permutation-in-string/",
  },
  {
    name: "Find All Anagrams in a String",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
  },
  {
    name: "Trapping Rain Water",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/trapping-rain-water/",
  },
  {
    name: "Minimum Window Substring",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/minimum-window-substring/",
  },
  {
    name: "Subarrays with K Different Integers",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/subarrays-with-k-different-integers/",
  },
  {
    name: "Shortest Subarray with Sum at Least K",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/",
  },
];

/**
 * Function do to two pointers
 */

function createStep(
  array: number[],
  activeIndex: number[],
  target: number,
  message: string,
  isMatched: boolean,
  currentLine: number
): Step {
  return {
    array: [...array],
    activeIndices: [...activeIndex],
    target,
    message,
    isMatched,
    currentLine,
  };
}

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
      false,
      4
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
        false,
        6
      )
    );

    if (sum === targetValue) {
      steps.push(
        createStep(
          sortedArray,
          [left, right],
          targetValue,
          "Pair found",
          true,
          7
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
          false,
          8
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
          false,
          9
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
      false,
      11
    )
  );

  return steps;
}