import { useEffect, useState } from "react";
import { Input } from "./input";
import { LoaderCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type InputWithIconProps = React.ComponentProps<typeof Input> & {
  icon?: LucideIcon;
  character?: string;
};
const InputWithIcon = ({
  className,
  icon: IconComponent,
  character,
  ...props
}: InputWithIconProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

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
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {renderIconOrCharacter()}
        </div>
      </div>
    </div>
  );
};

export default InputWithIcon;
