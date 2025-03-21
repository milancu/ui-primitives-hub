import Tab from "@/features/header/components/tab.tsx";

type ProjectTab = {
  id: string;
  path: string;
};

const ProjectTabs = () => {
  const projects = [];

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className={"flex h-full items-center"}>
      {projects.map((project: ProjectTab) => (
        <Tab
          id={project.id}
          isActive={project.id === "TODO"}
          path={project.path}
          closeTab={() => {}}
          key={project.id}
        />
      ))}
    </div>
  );
};

export default ProjectTabs;
