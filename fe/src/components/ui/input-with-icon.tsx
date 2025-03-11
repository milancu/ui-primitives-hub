import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { LoaderCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type InputWithIconProps = React.ComponentProps<typeof Input> & {
  icon?: LucideIcon;
  character?: string;
  triggerChange: (newValue: string) => void;
};

const InputWithIcon = ({
  className,
  icon: IconComponent,
  character,
  triggerChange,
  value,
  ...props
}: InputWithIconProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   setInputValue(value);
  // }, [value]);

  // useEffect(() => {
  //   if (inputValue) {
  //     setIsLoading(true);
  //     const timer = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 500);
  //     return () => clearTimeout(timer);
  //   }
  //   setIsLoading(false);
  // }, [inputValue]);
  //
  // useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  const handleChangeValue = (newValue: string) => {
    setInputValue(newValue);
    triggerChange(newValue)

    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    // }
    //
    // timeoutRef.current = setTimeout(() => {
    //   triggerChange(newValue);
    // }, 500);
  };

  const renderIconOrCharacter = () => {
    if (isLoading) {
      return (
        <LoaderCircle
          className="animate-spin"
          size={16}
          strokeWidth={1.5}
          role="status"
          aria-label="Loading..."
        />
      );
    }

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
          value={inputValue}
          onChange={(e) => handleChangeValue(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {renderIconOrCharacter()}
        </div>
      </div>
    </div>
  );
};

export default InputWithIcon;