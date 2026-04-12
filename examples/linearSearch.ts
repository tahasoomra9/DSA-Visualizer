import type { Step } from "../types/algorithm";

export type LinearSearchProblem = {
    name : string;
    difficulty: "Easy"  | "Medium" | "Hard";
    link: string;
}

export const LINEAR_SEARCH_DIFFICULTY_COLORS: Record<LinearSearchProblem["difficulty"],string> = {
  
   Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};
export const LINEAR_SEARCH_PROBLEMS = [
  // Easy 
  {
    name: "Linear Search (Find Target in Array)",
    difficulty: "Easy",
    link: "https://www.geeksforgeeks.org/linear-search/"
  },
  {
    name: "Find Numbers with Even Number of Digits",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/find-numbers-with-even-number-of-digits/"
  },
  {
    name: "Check If N and Its Double Exist",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/check-if-n-and-its-double-exist/"
  },
  {
    name: "Find Pivot Index",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/find-pivot-index/"
  },
  {
    name: "Richest Customer Wealth",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/richest-customer-wealth/"
  },

  // Medium
  {
    name: "Two Sum (Unsorted - Brute Force)",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/"
  },
  {
    name: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    name: "Maximum Subarray",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    name: "Majority Element",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/majority-element/"
  },
  {
    name: "Move Zeroes",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/move-zeroes/"
  },
  {
    name: "Find All Numbers Disappeared in an Array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/"
  },
  
];

/**
 * Function to do a Linear Search before implementing anything
 * 
 */

function createStep(
  array: number[],
  activeIndex: number,
  target: number,
  message: string,
  isMatched: boolean,
  currentLine: number
): Step {
  return {
    array: [...array],
    activeIndices: activeIndex >= 0 ? [activeIndex] : [],
    target,
    message,
    isMatched,
    currentLine,
  };
}

export function linearSearchGenerator(arrayToSearch: number[], targetValue: number): Step[] {
  const steps: Step[] = [];

  steps.push(createStep(arrayToSearch, -1, targetValue, "", false, 1));

  for (let i = 0; i < arrayToSearch.length; i += 1) {
    const currNum = arrayToSearch[i];
    let message = `Checking element ${currNum} at index ${i}`;
    let isMatched = false;

    if (currNum === targetValue) {
      message = `Target found at index ${i}`;
      isMatched = true;
      steps.push(createStep(arrayToSearch, i, targetValue, message, isMatched, 5));
      return steps;
    }

    steps.push(createStep(arrayToSearch, i, targetValue, message, isMatched, 3));
  }

  steps.push(createStep(arrayToSearch, -1, targetValue, `Target Value ${targetValue} not found in array`, false, 8));
  return steps;

}