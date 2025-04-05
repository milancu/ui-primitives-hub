import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import React from "react";
import { useGetProjectColors } from "@/features/color-customizer/hooks/queries/useGetProjectColors.ts";
import { useProjectStore } from "@/hooks/store/project-store.ts";

function ColorDot({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={style}
    >
      <circle cx="8" cy="8" r="8" />
    </svg>
  );
}

type ColorSelectProps = {
  placeholder: string;
  value?: string;
  handleChange: (newValue: string) => void;
};

const ColorSelect = ({
  value,
  handleChange,
  placeholder,
}: ColorSelectProps) => {
  const projectId = useProjectStore((state) => state.projectId);

  const { data } = useGetProjectColors(projectId);
  const lightColorScheme = data?.light;
  const darkColorScheme = data?.dark;

  const formatColorKey = (input: string) => {
    return input.replace(/([A-Z])/g, " $1").toLowerCase();
  };

  if (!lightColorScheme || !darkColorScheme) {
    return null;
  }

  console.log(value);

  return (
    <Select
      value={value || ""}
      onValueChange={(newValue) => {
        if (newValue !== value) {
          handleChange(newValue);
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(lightColorScheme).map(([key, value]) => {
          const darkValue = darkColorScheme[key];
          return (
            <SelectItem key={key} value={`var(--${key})`}>
          <span className="flex items-center gap-2">
            <ColorDot
              className={`text-[var(--${key})]`}
              style={{
                [`--${key}`]: `oklch(${value.l} ${value.c} ${value.h})`,
              }}
            />
            <ColorDot
              className={`text-[var(--${key})]`}
              style={{
                [`--${key}`]: `oklch(${darkValue.l} ${darkValue.c} ${darkValue.h})`,
              }}
            />
            <span className="truncate">
              <strong>{formatColorKey(key)}</strong>
            </span>
          </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export { ColorSelect };
