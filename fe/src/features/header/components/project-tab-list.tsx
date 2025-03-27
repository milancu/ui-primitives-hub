import ProjectTab from "@/features/header/components/project-tab.tsx";
import { Tab } from "@ui-primitives-hub/types";
import { useParams } from "@tanstack/react-router";
import { useProjectTabs } from "@/hooks/use-project-tabs";

const ProjectTabList = () => {
  const { id: currentId } = useParams({ strict: false });
  const { tabs, closeTab } = useProjectTabs();

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className={"flex h-full items-center"}>
      {tabs.map((tab: Tab) => (
        <ProjectTab
          name={tab.name}
          isActive={tab.id === currentId}
          path={tab.path}
          closeTab={(e) => {
            e.stopPropagation();
            closeTab(tab.id);
          }}
          key={tab.id}
        />
      ))}
    </div>
  );
};

export default ProjectTabList;
