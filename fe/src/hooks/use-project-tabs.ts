import { useEffect } from "react";
import { useLocation, useParams } from "@tanstack/react-router";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { Tab } from "@ui-primitives-hub/types";
import { useGetProjectName } from "@/features/project/hooks/queries/useGetProjectName.ts";

export const useProjectTabs = () => {
  const [tabs, setTabs] = usePersistedState<Tab[]>("project-tabs", []);
  const { id } = useParams({ strict: false });
  const { data: project } = useGetProjectName(id);
  const location = useLocation();

  useEffect(() => {
    if (!id || !project) return;

    const currentId = location.pathname.split("/").filter(Boolean)[0];

    if (currentId !== id) return;

    const newTab = {
      id,
      name: project.name,
      path: location.href,
    };

    setTabs((prev) => {
      const existsIndex = prev.findIndex((tab) => tab.id === id);

      if (existsIndex === -1) return [...prev, newTab];

      return prev.map((tab) =>
        tab.id === id ? { ...tab, path: newTab.path, name: newTab.name } : tab,
      );
    });
  }, [id, project, setTabs, location]);

  const closeTab = (tabId: string) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
  };

  return {
    tabs,
    closeTab,
    currentTabId: id,
  };
};
