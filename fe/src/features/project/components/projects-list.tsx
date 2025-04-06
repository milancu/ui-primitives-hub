import { ProjectMetadata } from "@ui-primitives-hub/types";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import ProjectCard from "@/features/project/components/project-card.tsx";
import { UpdateProjectFormDialog } from "@/features/project/components/update-project-form-dialog.tsx";
import { toast } from "sonner";
import { useDeleteProject } from "@/features/project/hooks/mutations/useDeleteProject.ts";
import { useCallback, useState } from "react";
import { useUpdateProject } from "@/features/project/hooks/mutations/useUpdateProject.ts";

type ProjectsListProps = {
  projects?: ProjectMetadata[];
};

const ProjectsList = ({ projects }: ProjectsListProps) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [projectName, setProjectName] = useState("");

  const { mutateAsync: deleteMutate } = useDeleteProject();
  const { mutateAsync: updateMutate, isPending: isUpdateProjectPending } =
    useUpdateProject();

  const handleUpdate = () => {
    updateMutate({ name: projectName, id: id })
      .then(() => {
        toast.success("Project updated successfully");
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong");
      });
  };

  const handleDelete = useCallback(
    (id: string) => {
      deleteMutate(id)
        .then(() => {
          toast.success("Project deleted");
        })
        .catch((error) => {
          toast.error(error.message || "Something went wrong");
        });
    },
    [deleteMutate],
  );

  if (!projects)
    return (
      <div
        className={
          "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        <Skeleton className={"h-32 w-full rounded-lg"} />
        <Skeleton className={"h-32 w-full rounded-lg"} />
        <Skeleton className={"h-32 w-full rounded-lg"} />
      </div>
    );

  return (
    <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"}>
      {projects.map((project, index) => (
        <ProjectCard
          project={project}
          key={index}
          handleDelete={handleDelete}
          triggerUpdate={(id, name) => {
            setId(id);
            setProjectName(name);
            setOpen(true);
          }}
        />
      ))}
      <UpdateProjectFormDialog
        open={open}
        setOpen={setOpen}
        name={projectName}
        isPending={isUpdateProjectPending}
        handleUpdate={handleUpdate}
        setProjectName={setProjectName}
      />
    </div>
  );
};

export default ProjectsList;
