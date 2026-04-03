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
}: Readonly<AlgorithmSelectorProps>) {
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
            variant={isSelected ? "secondary" : "outline"}
            size="lg"
            className="rounded-lg"
          >
            {algorithm.label}
          </Button>
        );
      })}
    </div>
  );
}
