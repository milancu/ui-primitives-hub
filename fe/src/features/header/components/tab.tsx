import { cn } from "@/lib/utils.ts";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import React from "react";

type TabProps = {
  id: string;
  path: string;
  isActive: boolean;
  closeTab: (e: React.MouseEvent) => void;
};

const Tab = ({ id, path, isActive, closeTab }: TabProps) => {
  const name = "TODO";

  if (!name) {
    return null;
  }

  return (
    <div
      className={cn(
        isActive && "bg-gray-500/20",
        "relative flex h-full items-center gap-2 border-r border-l text-center transition-all duration-200",
        "group data-[state=active]:bg-accent/70",
        "hover:pr-4",
      )}
    >
      <Link
        to={`${id}/${path}`}
        className={"flex h-full flex-1 items-center p-4"}
      >
        <span className="max-w-[100px] min-w-18 truncate text-xs">{name}</span>
      </Link>
      <X
        className="text-muted-foreground hover:text-destructive pointer-events-none absolute right-2 ml-1 h-3 w-3 cursor-pointer opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
        onClick={(e) => {
          closeTab(e);
        }}
      />
    </div>
  );
};

export default Tab;
