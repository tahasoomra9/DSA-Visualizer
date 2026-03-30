import { Button } from "@/components/ui/button";
import {
  ALGORITHM_DEFINITIONS,
  ALGORITHM_ORDER,
  type AlgorithmKey,
} from "@/lib/algorithms";

type AlgorithmSelectorProps = {
  selectedAlgorithm: AlgorithmKey;
  onSelect: (algorithm: AlgorithmKey) => void;
};

export function AlgorithmSelector({
  selectedAlgorithm,
  onSelect,
}: AlgorithmSelectorProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {ALGORITHM_ORDER.map((key) => {
        const algorithm = ALGORITHM_DEFINITIONS[key];
        const isSelected = key === selectedAlgorithm;

        return (
          <Button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className="px-4 py-2 rounded-lg border"
            style={{
              borderColor: isSelected ? "var(--primary)" : "var(--border)",
              backgroundColor: isSelected ? "var(--primary)" : "var(--secondary)",
              color: isSelected ? "var(--primary-foreground)" : "var(--secondary-foreground)",
            }}
          >
            {algorithm.label}
          </Button>
        );
      })}
    </div>
  );
}
