import { Input } from "@/components/ui/input";
import { ChevronDown, type LucideIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type InputComponentUnitSwitcher = React.ComponentProps<typeof Input> & {
  icon?: LucideIcon;
  character?: string;
  handleChange: (newValue: string) => void;
  value?: string;
  unit?: "rem" | "px";
};

function InputComponentUnitSwitcher({
                                      icon: IconComponent,
                                      character,
                                      handleChange,
                                      className,
                                      value = "",
                                      unit = "rem",
                                      ...props
                                    }: InputComponentUnitSwitcher) {
  const [inputValue, setInputValue] = useState<number | string>(value ? parseFloat(value.replace(/[a-zA-Z]+$/, "")) : "");
  const [selectedUnit, setSelectedUnit] = useState<"rem" | "px">(unit);

  const updateValue = (newInputValue: number | string) => {
    const newValue = `${newInputValue}${selectedUnit}`;
    handleChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value === "" ? "" : parseFloat(e.target.value);
    setInputValue(newInputValue);
  };

  const handleUnitChange = (newUnit: "rem" | "px") => {
    if (typeof inputValue === "number") {
      let convertedValue = inputValue;
      if (selectedUnit === "rem" && newUnit === "px") {
        convertedValue = inputValue * 16;
      } else if (selectedUnit === "px" && newUnit === "rem") {
        convertedValue = inputValue / 16;
      }
      setInputValue(convertedValue);
    }
    setSelectedUnit(newUnit);
  };

  useEffect(() => {
    if (value) {
      const valueWithoutUnit = parseFloat(value.replace(/[a-zA-Z]+$/, ""));
      setInputValue(valueWithoutUnit);
      const unitMatch = value.match(/(rem|px)$/);
      setSelectedUnit(unitMatch ? (unitMatch[1] as "rem" | "px") : "rem");
    }
  }, [value]);

  useEffect(() => {
    if (selectedUnit !== undefined) {
      updateValue(inputValue);
    }
  }, [inputValue, selectedUnit]);

  const renderIconOrCharacter = () => {
    if (character) return <span>{character}</span>;
    if (IconComponent)
      return <IconComponent size={16} strokeWidth={1.5} aria-hidden="true" />;
    return null;
  };

  return (
    <div className="space-y-2">
      <div className="rounded-lshadow-sm flex shadow-black/5">
        <div className="relative inline-flex">
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            {renderIconOrCharacter()}
          </div>
        </div>
        <Input
          className={cn(
            "peer -me-px rounded-e-none shadow-none focus-visible:z-10",
            (character || IconComponent) && "ps-9",
            className,
          )}
          {...props}
          type="number"
          min={0}
          onChange={handleInputChange}
          value={inputValue !== "" ? inputValue : ""}
        />
        <div className="relative inline-flex">
          <select
            onChange={(e) => handleUnitChange(e.target.value as "rem" | "px")}
            className="peer border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:ring-ring/20 inline-flex h-full appearance-none items-center rounded-none rounded-e-lg border ps-3 pe-8 text-sm transition-shadow focus:z-10 focus-visible:ring-[3px] focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Unit"
            value={selectedUnit}
          >
            <option value="rem">rem</option>
            <option value="px">px</option>
          </select>
          <span className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 z-10 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
            <ChevronDown
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              role="img"
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default InputComponentUnitSwitcher;
