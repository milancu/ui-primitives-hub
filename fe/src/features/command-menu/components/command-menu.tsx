import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useMenuContext } from "@/features/command-menu/components/CommandMenuContext";
import { useSearchProjects } from "@/features/command-menu/hooks/queries/useSearchProjects";
import { useDebounce } from "use-debounce";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  Copy,
  FileText,
  Folder,
  History,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";
import { useProjectStore } from "@/hooks/store/project-store.ts";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard.ts";

export function CommandMenu() {
  const { open, setOpen } = useMenuContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const { data: projects = [], isLoading } =
    useSearchProjects(debouncedSearchTerm);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const projectId = useProjectStore((state) => state.projectId);
  const { copy } = useCopyToClipboard();

  const recentProjects = projects.slice(0, 3);

  const handleSelectProject = (projectId: string) => {
    navigate({
      to: "/$id",
      params: { id: projectId },
    });
    setOpen(false);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div>
        <CommandInput
          placeholder="Type a command or search..."
          value={searchTerm}
          onValueChange={setSearchTerm}
          onKeyDown={(e) => {
            if (e.key === "Enter" && projects.length > 0) {
              handleSelectProject(projects[0].id);
            }
          }}
        />
      </div>
      <CommandList>
        {isLoading ? (
          <div className="py-6 text-center">
            <Loader2 className="text-muted-foreground mx-auto h-6 w-6 animate-spin" />
            <p className="text-muted-foreground mt-2 text-sm">
              Searching projects...
            </p>
          </div>
        ) : (
          <>
            {searchTerm && (
              <CommandEmpty>
                <div className="flex flex-col items-center justify-center py-6">
                  <FileText className="text-muted-foreground/50 mb-2 h-10 w-10" />
                  <p className="text-muted-foreground text-sm">
                    No projects found for "{searchTerm}"
                  </p>
                  <p className="text-muted-foreground/70 mt-1 text-xs">
                    Try searching with a different term
                  </p>
                </div>
              </CommandEmpty>
            )}

            {!searchTerm && recentProjects.length > 0 && (
              <CommandGroup heading="Recent Projects">
                {recentProjects.map((project) => (
                  <CommandItem
                    key={`recent-${project.id}`}
                    value={`recent-${project.name}`}
                    className="flex items-center justify-between py-2"
                    onSelect={() => handleSelectProject(project.id)}
                  >
                    <div className="flex items-center">
                      <History className="text-muted-foreground mr-2 h-4 w-4" />
                      <span className="font-medium">{project.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatDate(project.updatedAt)}
                      </Badge>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {projects.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Projects">
                  {projects.map((project) => (
                    <CommandItem
                      key={project.id}
                      value={project.name}
                      className="flex items-center justify-between py-2"
                      onSelect={() => handleSelectProject(project.id)}
                    >
                      <div className="flex items-center">
                        <Folder className="text-muted-foreground mr-2 h-4 w-4" />
                        <span className="font-medium">{project.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="mr-1 h-3 w-3" />
                          {formatDate(project.updatedAt)}
                        </Badge>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            <CommandSeparator />
            <CommandGroup heading="Quick Actions">
              <CommandItem
                onSelect={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  toast.info(
                    `Switched to ${theme === "dark" ? "light" : "dark"} mode`,
                  );
                  setOpen(false);
                }}
              >
                {theme === "dark" ? (
                  <Sun className="mr-2 h-4 w-4" />
                ) : (
                  <Moon className="mr-2 h-4 w-4" />
                )}
                <span>
                  Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                </span>
              </CommandItem>

              <CommandItem
                onSelect={() => {
                  if (projectId) {
                    copy(projectId).then(() => {
                      setOpen(false);
                    });
                  } else {
                    toast.error("No project is currently open");
                  }
                }}
                disabled={!projectId}
              >
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Project ID</span>
                {!projectId && (
                  <span className="text-muted-foreground ml-2 text-xs">
                    (No project open)
                  </span>
                )}
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
