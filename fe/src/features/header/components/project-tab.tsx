import { cn } from "@/lib/utils.ts";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Pencil, X } from "lucide-react";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard.ts";

type TabProps = {
  id: string;
  path: string;
  isActive: boolean;
  closeTab: (e: React.MouseEvent) => void;
  name: string;
  renameProject: (id: string, name: string) => void;
};

const ProjectTab = ({
  id,
  path,
  isActive,
  closeTab,
  name,
  renameProject,
}: TabProps) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={cn(
            isActive && "bg-gray-500/20",
            "relative flex h-full items-center gap-2 border-r border-l text-center transition-all duration-200",
            "group data-[state=active]:bg-accent/70",
            "hover:pr-4",
          )}
        >
          <Link
            to={`${path}`}
            className={"flex h-full flex-1 items-center p-4"}
          >
            <span className="max-w-[100px] min-w-18 truncate text-xs">
              {name}
            </span>
          </Link>
          <X
            className="text-muted-foreground hover:text-destructive pointer-events-none absolute right-2 ml-1 h-3 w-3 cursor-pointer opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
            onClick={(e) => {
              closeTab(e);
            }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className={"flex items-center gap-4"}
          onClick={() => renameProject(id, name)}
        >
          <Pencil />
          Rename Project
        </ContextMenuItem>
        <ContextMenuItem
          className={"flex items-center gap-4"}
          onClick={(e) => {
            e.preventDefault();
            copy(id);
          }}
        >
          <div
            className={cn(
              "transition-all",
              copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
            )}
          >
            <Check
              className="stroke-emerald-500"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          <div
            className={cn(
              "absolute transition-all",
              copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
            )}
          >
            <Copy size={16} strokeWidth={2} aria-hidden="true" />
          </div>
          Copy Project ID
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ProjectTab;
