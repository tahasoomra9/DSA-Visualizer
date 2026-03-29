import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type InputSettingsProps = {
  draftArray: string;
  draftTarget: string;
  isArrayValid: boolean;
  isTargetValid: boolean;
  isInputValid: boolean;
  onArrayChange: (value: string) => void;
  onTargetChange: (value: string) => void;
  onSubmit: () => void;
};

export function InputSettings({
  draftArray,
  draftTarget,
  isArrayValid,
  isTargetValid,
  isInputValid,
  onArrayChange,
  onTargetChange,
  onSubmit,
}: InputSettingsProps) {
  return (
    <div className="mt-8 space-y-4 rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
      <h3 className="text-base font-semibold" style={{ color: "var(--primary)" }}>
        Input Settings
      </h3>

      <div className="space-y-1.5">
        <label htmlFor="example-array" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          Example Array
        </label>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Enter numbers separated by commas, e.g. 8,4,2,1,7
        </p>
        <Input
          id="example-array"
          type="text"
          required
          value={draftArray}
          aria-invalid={!isArrayValid}
          placeholder="8,4,2,1,7"
          onChange={(e) => onArrayChange(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="target-value" className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
          Target Value
        </label>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Enter one number to search for, e.g. 7
        </p>
        <Input
          id="target-value"
          type="text"
          required
          value={draftTarget}
          aria-invalid={!isTargetValid}
          placeholder="7"
          onChange={(e) => onTargetChange(e.target.value)}
        />
      </div>

      <Button
        disabled={!isInputValid}
        className="mt-1 w-full sm:w-auto"
        style={{
          backgroundColor: isInputValid ? "var(--primary)" : "var(--muted)",
          color: isInputValid ? "var(--primary-foreground)" : "var(--muted-foreground)",
        }}
        onClick={onSubmit}
      >
        Done
      </Button>
    </div>
  );
}
