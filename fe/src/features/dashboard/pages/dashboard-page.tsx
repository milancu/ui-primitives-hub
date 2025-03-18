import ProjectsList from "@/features/projects-list/components/projects-list.tsx";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import { ProjectFormDialog } from "@/features/projects-list/components/project-form-dialog.tsx";

const DashboardPage = () => {
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
      <div className={"relative z-10 flex flex-col gap-4"}>
        <div className={"flex w-full items-center justify-between"}>
          <div>
            <div className={"text-xl font-semibold"}>Your projects</div>
            <div className={"text-muted-foreground"}>
              An overview of all your projects in one place
            </div>
          </div>
          <ProjectFormDialog />
        </div>
        <ProjectsList />
      </div>
    </div>
  );
};

export default DashboardPage;
