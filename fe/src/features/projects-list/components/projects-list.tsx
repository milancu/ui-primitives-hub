import ProjectCard from "@/features/projects-list/components/project-card.tsx";
import { Project } from "@ui-primitives-hub/types";
import { Skeleton } from "@/components/ui/skeleton.tsx";

type ProjectsListProps = {
  projects?: Project[];
};

const ProjectsList = ({ projects }: ProjectsListProps) => {
  if (!projects)
    return (
      <div
        className={
          "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        <Skeleton className={'h-32 w-full rounded-lg'} />
        <Skeleton className={'h-32 w-full rounded-lg'} />
        <Skeleton className={'h-32 w-full rounded-lg'} />
      </div>
    );

  return (
    <div
      className={
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }
    >
      {projects.map((project, index) => (
        <ProjectCard project={project} key={index} />
      ))}
    </div>
  );
};

export default ProjectsList;
