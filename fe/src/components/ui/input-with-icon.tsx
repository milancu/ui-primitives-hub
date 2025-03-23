import React from "react";
import { Input } from "./input";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type InputWithIconProps = React.ComponentProps<typeof Input> & {
  icon?: LucideIcon;
  character?: string;
  handleChange: (newValue: string) => void;
};

const InputWithIcon = ({
  className,
  icon: IconComponent,
  character,
  handleChange,
  value,
  ...props
}: InputWithIconProps) => {
  const renderIconOrCharacter = () => {
    if (character) {
      return <span>{character}</span>;
    }

    if (IconComponent) {
      return <IconComponent size={16} strokeWidth={1.5} aria-hidden="true" />;
    }

    return null;
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          {...props}
          className={cn("peer ps-9", className)}
          value={value ?? ''}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {renderIconOrCharacter()}
        </div>
      </div>
    </div>
  );
};

export default InputWithIcon;