import { Label } from "@/components/ui/label";
import { clampChroma, formatHex, oklch } from "culori";
import { useCallback, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";

type OklchColor = {
  l: number;
  c: number;
  h: number;
};

type OklchEditorProps = {
  initialOklchValue: OklchColor;
  onChange: (newOklchValue: OklchColor) => void;
};

const oklchToHex = (oklchObj: OklchColor): string => {
  const color = oklch({ mode: "oklch", ...oklchObj });
  return formatHex(clampChroma(color)) || "#000000";
};

const SliderControl = ({
  id,
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
  children?: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <Label htmlFor={id}>
        {label}: {format(value)}
      </Label>
    </div>
    <Slider
      id={id}
      min={min}
      max={max}
      step={step}
      value={[value]}
      onValueChange={([v]) => onChange(v)}
    />
    {children}
  </div>
);

const OklchEditor = ({ initialOklchValue, onChange }: OklchEditorProps) => {
  const [oklchValue, setOklchValue] = useState<OklchColor>(initialOklchValue);
  const [hexValue, setHexValue] = useState(() => oklchToHex(initialOklchValue));

  const updateColor = useCallback(
    (newValues: Partial<OklchColor>) => {
      const newOklch = { ...oklchValue, ...newValues };

      try {
        const color = oklch({ mode: "oklch", ...newOklch });
        if (!color) return;

        const clampedColor = clampChroma(color);
        const newHex = formatHex(clampedColor);

        setOklchValue({
          l: Number(clampedColor.l?.toFixed(3)),
          c: Number(clampedColor.c?.toFixed(3)),
          h: Number(clampedColor.h?.toFixed(1)),
        });
        setHexValue(newHex || hexValue);
        onChange(newOklch);
      } catch (error) {
        console.error("Error updating color:", error);
      }
    },
    [oklchValue, hexValue, onChange],
  );

  useEffect(() => {
    const updateFromHex = () => {
      try {
        const color = oklch(hexValue);
        if (!color) return;

        const newOklch = {
          l: Number(color.l.toFixed(3)),
          c: Number(color.c.toFixed(3)),
          h: Number(color.h.toFixed(1)),
        };

        if (JSON.stringify(newOklch) !== JSON.stringify(oklchValue)) {
          setOklchValue(newOklch);
          onChange(newOklch);
        }
      } catch (error) {
        console.error("Error converting color:", error);
      }
    };

    updateFromHex();
  }, [hexValue, oklchValue, onChange]);

  useEffect(() => {
    setOklchValue(initialOklchValue);
    setHexValue(oklchToHex(initialOklchValue));
  }, [initialOklchValue]);

  return (
    <div className="space-y-6">
      <h3 className="mb-4 text-lg font-medium">OKLCH Controls</h3>

      <SliderControl
        id="lightness"
        label="Lightness (L)"
        value={oklchValue.l}
        min={0}
        max={1}
        step={0.001}
        format={(v) => v.toFixed(3)}
        onChange={(l) => updateColor({ l })}
      />

      <SliderControl
        id="chroma"
        label="Chroma (C)"
        value={oklchValue.c}
        min={0}
        max={0.4}
        step={0.001}
        format={(v) => v.toFixed(3)}
        onChange={(c) => updateColor({ c })}
      />

      <SliderControl
        id="hue"
        label="Hue (H)"
        value={oklchValue.h}
        min={0}
        max={360}
        step={0.1}
        format={(v) => `${v.toFixed(1)}°`}
        onChange={(h) => updateColor({ h })}
      >
        <div
          className="mt-1 h-4 w-full rounded-md"
          style={{
            background:
              "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
        />
      </SliderControl>
    </div>
  );
};

export default OklchEditor;
