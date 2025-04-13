import ProjectTab from "@/features/header/components/project-tab.tsx";
import { Tab } from "@ui-primitives-hub/types";
import { useParams } from "@tanstack/react-router";
import { useProjectTabs } from "@/hooks/use-project-tabs";
import { UpdateProjectFormDialog } from "@/features/project/components/update-project-form-dialog.tsx";
import { useState } from "react";
import { useUpdateProject } from "@/features/project/hooks/mutations/useUpdateProject.ts";
import { toast } from "sonner";

const ProjectTabList = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [id, setId] = useState("");


  const { mutateAsync: updateMutate, isPending: isUpdateProjectPending } =
    useUpdateProject();

  const { id: currentId } = useParams({ strict: false });
  const { tabs, closeTab } = useProjectTabs();

  const handleUpdate = () => {
    if (!currentId) return;
    updateMutate({ name: projectName, id: id })
      .then(() => {
        toast.success("Project updated successfully");
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.message || "Something went wrong");
      });
  };

  const triggerUpdateFormDialog = (id: string, name: string) => {
    setId(id)
    setProjectName(name)
    setOpen(true)
  }

  if (!tabs || tabs.length === 0) return null;

  return (
    <>
      <div className={"flex h-full overflow-auto"}>
        {tabs.map((tab: Tab) => (
          <ProjectTab
            id={tab.id}
            name={tab.name}
            isActive={tab.id === currentId}
            path={tab.path}
            closeTab={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
            renameProject={triggerUpdateFormDialog}
            key={tab.id}
          />
        ))}
      </div>
      <UpdateProjectFormDialog
        open={open}
        setOpen={setOpen}
        name={projectName}
        isPending={isUpdateProjectPending}
        handleUpdate={handleUpdate}
        setProjectName={setProjectName}
      />
    </>
  );
};

export default ProjectTabList;
