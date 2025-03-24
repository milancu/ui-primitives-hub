import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ColorCardProps {
  name: string;
  mainColor: string;
  textColor: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

export const ColorCard: React.FC<ColorCardProps> = ({
  name,
  mainColor,
  textColor,
  onClick,
  active = false,
  className,
}) => {
  return (
    <Card
      className={cn(
        "group hover-lift h-28 w-full cursor-pointer overflow-hidden rounded-lg transition-all",
        active && "ring-primary ring-2",
        className,
      )}
      onClick={onClick}
      style={{ backgroundColor: mainColor }}
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 p-3">
          <div className="flex h-full items-start justify-between">
            <span className="text-sm font-medium" style={{ color: textColor }}>
              {name}
            </span>
          </div>
        </div>
        <div
          className="flex h-8 items-center px-3 py-1 font-mono text-xs"
          style={{
            backgroundColor: `${textColor}20`,
            color: textColor,
            borderTop: `1px solid ${textColor}30`,
          }}
        >
          {mainColor}
        </div>
      </div>
    </Card>
  );
};
