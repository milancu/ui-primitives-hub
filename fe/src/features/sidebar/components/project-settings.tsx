import { Check, Copy, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useProjectStore } from "@/hooks/store/project-store";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard.ts";
import { cn } from "@/lib/utils.ts";
import { useGetProjectName } from "@/features/project/hooks/queries/useGetProjectName.ts";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectSettings = () => {
  const projectId = useProjectStore((state) => state.projectId);
  const { copied, copy } = useCopyToClipboard();
  const { data: project } = useGetProjectName(projectId);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex flex-col gap-0.5 leading-none">
                {project ? (
                  <span className="font-semibold">{project.name}</span>
                ) : (
                  <Skeleton className={"h-6 w-36"} />
                )}
              </div>
              <MoreHorizontal className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            <DropdownMenuItem onSelect={() => copy(projectId!)}>
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
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default ProjectSettings;
