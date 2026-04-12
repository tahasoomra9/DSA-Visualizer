import type { AlgorithmKey } from "@/lib/algorithms";
import type { Step } from "@/types/algorithm";

type AlgorithmCodeConfig = {
  language: string;
  code: string;
  getCurrentLine: (step: Step) => number;
};

const LINEAR_SEARCH_CODE = `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        int value = arr[i];
        if (value == target) {
            return i;
        }
    }
    return -1;
}`;

const TWO_POINTERS_CODE = `import java.util.Arrays;

public static int[] twoPointers(int[] arr, int target) {
    int[] sorted = arr.clone();
    Arrays.sort(sorted);

    int left = 0;
    int right = sorted.length - 1;

    while (left < right) {
        int sum = sorted[left] + sorted[right];

        if (sum == target) {
            return new int[]{left, right};
        }

        if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return null;
}`;

const SLIDING_WINDOW_CODE = `public static int[] slidingWindow(int[] arr, int target) {
    int left = 0;
    int sum = 0;

    for (int right = 0; right < arr.length; right++) {
        sum += arr[right];

        while (sum > target && left <= right) {
            sum -= arr[left];
            left++;
        }

        if (sum == target) {
            return new int[]{left, right};
        }
    }

    return null;
}`;

const BINARY_SEARCH_CODE = `import java.util.Arrays;

public static int binarySearch(int[] arr, int target) {
    int[] sorted = arr.clone();
    Arrays.sort(sorted);

    int low = 0;
    int high = sorted.length - 1;

    while (low <= high) {
        int mid = (low + high) / 2;

        if (sorted[mid] == target) {
            return mid;
        }

        if (sorted[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}`;

function getStepCurrentLine(step: Step): number {
  if (typeof step.currentLine === "number" && step.currentLine > 0) {
    return step.currentLine;
  }

  return 1;
}

export const ALGORITHM_CODE_CONFIGS: Record<AlgorithmKey, AlgorithmCodeConfig> = {
  "linear-search": {
    language: "java",
    code: LINEAR_SEARCH_CODE,
    getCurrentLine: getStepCurrentLine,
  },
  "two-pointers": {
    language: "java",
    code: TWO_POINTERS_CODE,
    getCurrentLine: getStepCurrentLine,
  },
  "sliding-window": {
    language: "java",
    code: SLIDING_WINDOW_CODE,
    getCurrentLine: getStepCurrentLine,
  },
  "binary-search": {
    language: "java",
    code: BINARY_SEARCH_CODE,
    getCurrentLine: getStepCurrentLine,
  },
};
