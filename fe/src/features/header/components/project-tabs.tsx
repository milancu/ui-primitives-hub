import { useLocation, useParams } from "@tanstack/react-router";
import React, { useEffect } from "react";
import Tab from "@/features/header/components/tab.tsx";
import { usePersistedState } from "@/hooks/use-persisted-state.ts";
import { useGetProject } from "@/features/dashboard/hooks/queries/useGetProject.ts";

type ProjectTab = {
  id: string;
  name: string;
  path: string;
};

const ProjectTabs = () => {
  const location = useLocation();
  const { id } = useParams({ strict: false });
  const { data: project } = useGetProject(id);

  const [projects, setProjects] = usePersistedState<ProjectTab[]>("projects", []);

  useEffect(() => {
    if (!id || !project) return;

    const currentPath = location.pathname;

    setProjects(prevProjects => {
      const existingIndex = prevProjects.findIndex(p => p.id === id);

      if (existingIndex > -1) {
        const updatedProjects = [...prevProjects];
        if (updatedProjects[existingIndex].path !== currentPath) {
          updatedProjects[existingIndex] = {
            ...updatedProjects[existingIndex],
            path: currentPath
          };
        }
        return updatedProjects;
      }

      return [...prevProjects, {
        id: id,
        name: project.name,
        path: currentPath
      }];
    });
  }, [project, id, location.pathname, setProjects]);

  const closeTab = (idTabToClose: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(projects.filter(project => project.id !== idTabToClose));
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className={"flex h-full items-center"}>
      {projects.map((project: ProjectTab) => (
        <Tab
          id={project.id}
          isActive={project.id === id}
          name={project.name}
          path={project.path}
          closeTab={closeTab}
          key={project.id} // Better to use project.id instead of index
        />
      ))}
    </div>
  );
};

export default ProjectTabs;