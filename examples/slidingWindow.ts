import type { Step } from "../types/algorithm";

export type SlidingWindowProblem = {
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  link: string;
}

export const SLIDING_WINDOW_DIFFICULTY_COLORS: Record<SlidingWindowProblem["difficulty"],string> = {
  
   Easy: "text-green-500",
  Medium: "text-yellow-500",
  Hard: "text-red-500",
};

export const SLIDING_WINDOW_PROBLEMS = [
  // Easy
  {
    name: "Maximum Average Subarray I",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/maximum-average-subarray-i/"
  },
  {
    name: "Contains Duplicate II",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/contains-duplicate-ii/"
  },
  {
    name: "Defanging an IP Address",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/defanging-an-ip-address/"
  },

  // Medium
  {
    name: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
  },
  {
    name: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-repeating-character-replacement/"
  },
  {
    name: "Permutation in String",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/permutation-in-string/"
  },
  {
    name: "Find All Anagrams in a String",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/"
  },
  {
    name: "Subarray Product Less Than K",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/subarray-product-less-than-k/"
  },
  {
    name: "Max Consecutive Ones III",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/max-consecutive-ones-iii/"
  },
  {
    name: "Fruit Into Baskets",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/fruit-into-baskets/"
  },
  {
    name: "Binary Subarrays With Sum",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/binary-subarrays-with-sum/"
  },

  //Hard
  {
    name: "Minimum Window Substring",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/minimum-window-substring/"
  },
  {
    name: "Sliding Window Maximum",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/sliding-window-maximum/"
  },
  {
    name: "Subarrays with K Different Integers",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/subarrays-with-k-different-integers/"
  },
  {
    name: "Longest Substring with At Most K Distinct Characters",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/"
  }
];

function createStep(
  array: number[],
  activeIndices: number[],
  target: number,
  message: string,
  isMatched: boolean,
  currentLine: number
): Step {
  return {
    array: [...array],
    activeIndices: [...activeIndices],
    target,
    message,
    isMatched,
    currentLine,
  };
}

function getWindowIndices(left: number, right: number): number[] {
  if (left > right || left < 0 || right < 0) {
    return [];
  }

  return Array.from({ length: right - left + 1 }, (_, i) => left + i);
}

export function slidingWindowGenerator(
  arrayToSearch: number[],
  targetValue: number
): Step[] {
  const steps: Step[] = [];

  steps.push(
    createStep(
      arrayToSearch,
      [],
      targetValue,
      "Initialize sliding window",
      false,
      2
    )
  );

  if (arrayToSearch.length === 0) {
    steps.push(
      createStep(
        arrayToSearch,
        [],
        targetValue,
        "Array is empty",
        false,
        1
      )
    );
    return steps;
  }

  if (arrayToSearch.some((num) => num < 0)) {
    steps.push(
      createStep(
        arrayToSearch,
        [],
        targetValue,
        "Use non-negative numbers for this sliding window demo",
        false,
        1
      )
    );
    return steps;
  }

  let left = 0;
  let sum = 0;

  for (let right = 0; right < arrayToSearch.length; right += 1) {
    sum += arrayToSearch[right];

    steps.push(
      createStep(
        arrayToSearch,
        getWindowIndices(left, right),
        targetValue,
        `Expand window: add ${arrayToSearch[right]}, sum = ${sum}`,
        false,
        5
      )
    );

    while (sum > targetValue && left <= right) {
      steps.push(
        createStep(
          arrayToSearch,
          getWindowIndices(left, right),
          targetValue,
          `Sum ${sum} is too large, remove ${arrayToSearch[left]} from left`,
          false,
          6
        )
      );

      sum -= arrayToSearch[left];
      left += 1;

      steps.push(
        createStep(
          arrayToSearch,
          getWindowIndices(left, right),
          targetValue,
          `Shrink window: sum = ${sum}`,
          false,
          8
        )
      );
    }

    if (sum === targetValue) {
      steps.push(
        createStep(
          arrayToSearch,
          getWindowIndices(left, right),
          targetValue,
          `Target sum found from index ${left} to ${right}`,
          true,
          10
        )
      );
      return steps;
    }
  }

  steps.push(
    createStep(
      arrayToSearch,
      [],
      targetValue,
      `No contiguous subarray found with sum ${targetValue}`,
      false,
      12
    )
  );

  return steps;
}