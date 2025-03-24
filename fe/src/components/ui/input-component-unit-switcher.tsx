import { Input } from "@/components/ui/input";
import { ChevronDown, type LucideIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type InputComponentUnitSwitcher = React.ComponentProps<typeof Input> & {
  icon?: LucideIcon;
  character?: string;
  handleChange: (newValue: string) => void;
  unit?: "rem" | "px";
};

function InputComponentUnitSwitcher({
  icon: IconComponent,
  character,
  handleChange,
  className,
  value,
  unit = "rem",
  ...props
}: InputComponentUnitSwitcher) {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);

  const [selectedUnit, setSelectedUnit] = useState<"rem" | "px">(() => {
    if (typeof value === "string") {
      const unitMatch = value.match(/(rem|px)$/);
      return unitMatch ? (unitMatch[1] as "rem" | "px") : unit;
    }
    return unit;
  });

  const renderIconOrCharacter = () => {
    if (character) return <span>{character}</span>;
    if (IconComponent)
      return <IconComponent size={16} strokeWidth={1.5} aria-hidden="true" />;
    return null;
  };

  const handleChangeSelectedUnit = useCallback(
    (newUnit: "rem" | "px") => {
      setSelectedUnit((prevUnit) => {
        if (inputValue === undefined) return newUnit;
        let convertedValue = inputValue;
        if (prevUnit === "rem" && newUnit === "px") {
          convertedValue = inputValue * 16;
        } else if (prevUnit === "px" && newUnit === "rem") {
          convertedValue = inputValue / 16;
        }
        setInputValue(convertedValue);
        return newUnit;
      });
    },
    [inputValue],
  );

  useEffect(() => {
    handleChange(
      inputValue !== undefined ? `${inputValue}${selectedUnit}` : "",
    );
  }, [inputValue, selectedUnit]);

  useEffect(()=>{
    if(typeof value === "string"){
      const unitMatch = value.match(/(rem|px)$/);
      if(unitMatch){
        setSelectedUnit(unitMatch[1] as "rem" | "px");
        setInputValue(parseFloat(value.replace(unitMatch[0], "")));
      }
    }
  },[value])

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
          onChange={(e) => {
            const num =
              e.target.value === "" ? undefined : parseFloat(e.target.value);
            setInputValue(num);
          }}
          value={inputValue ?? ""}
        />
        <div className="relative inline-flex">
          <select
            onChange={(e) =>
              handleChangeSelectedUnit(e.target.value as "rem" | "px")
            }
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
