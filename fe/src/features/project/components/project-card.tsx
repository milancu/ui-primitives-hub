import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Calendar, Ellipsis, Eye, File, Pencil, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Project } from "@ui-primitives-hub/types";

type ProjectCardProps = {
  project: Project;
  handleDelete: (id: string) => void;
  triggerUpdate: (id: string, name: string) => void;
};

const ProjectCard = ({
  project,
  handleDelete,
  triggerUpdate,
}: ProjectCardProps) => {
  const { id, name, updatedAt } = project;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`transition-all duration-200 ${isHovered ? "shadow-md" : "shadow-sm"} overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <CardTitle className={"flex items-center justify-between gap-2"}>
          <div className={"flex items-center gap-3"}>
            <div
              className={`rounded-md p-2 ${isHovered ? "bg-primary/10" : "bg-muted"} transition-colors duration-200`}
            >
              <File
                className={`h-5 w-5 ${isHovered ? "text-primary" : "text-muted-foreground"} transition-colors duration-200`}
                aria-hidden="true"
              />
            </div>
            <Link to={`${id}`} className={"text-lg"}>
              {name}
            </Link>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="flex-shrink-0 rounded-full shadow-none"
                aria-label="Otevřít menu"
              >
                <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`${id}`} className={"flex items-center"}>
                  {" "}
                  <Eye className="mr-2 h-4 w-4" />
                  Open
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => triggerUpdate(id, name)}>
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleDelete(id)}
              >
                <Trash2 className="text-destructive mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex h-full flex-col justify-between pb-4">
        <div className="text-muted-foreground mt-4 flex items-center gap-1.5 text-sm">
          <Calendar className="h-3.5 w-3.5" />
          <span>{format(updatedAt, "dd.MM.yyyy", { locale: cs })}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
