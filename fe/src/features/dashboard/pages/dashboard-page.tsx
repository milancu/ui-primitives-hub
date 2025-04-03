import { GridPattern } from "@/components/magicui/grid-pattern";
import { AddProjectFormDialog } from "@/features/project/components/add-project-form-dialog.tsx";
import { useGetProjects } from "@/features/project/hooks/queries/useGetProjects";
import { cn } from "@/lib/utils";
import ProjectsList from "@/features/project/components/projects-list.tsx";

const DashboardPage = () => {
  const { data: projects } = useGetProjects();

  return (
    <div className={"relative container mx-auto py-4"}>
      <GridPattern
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          "opacity-80",
        )}
      />
      <div className={"relative z-10 flex flex-col gap-4 p-4 md:p-0"}>
        <div className={"flex w-full items-center justify-between"}>
          <div>
            <div className={"text-xl font-semibold"}>Your projects</div>
            <div className={"text-muted-foreground"}>
              An overview of all your projects in one place
            </div>
          </div>
          <AddProjectFormDialog />
        </div>
        <ProjectsList projects={projects} />
      </div>
    </div>
  );
};

export default DashboardPage;
