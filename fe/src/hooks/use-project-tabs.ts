import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "@tanstack/react-router";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { Tab } from "@ui-primitives-hub/types";
import { useGetProjectName } from "@/features/project/hooks/queries/useGetProjectName.ts";

export const useProjectTabs = () => {
  const [tabs, setTabs] = usePersistedState<Tab[]>("project-tabs", []);
  const { id } = useParams({ strict: false });
  const { data: project } = useGetProjectName(id);
  const location = useLocation();
  const navigate = useNavigate();

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
    if (tabId === id) {
      const currentTabs = tabs;
      const currentIndex = currentTabs.findIndex((tab) => tab.id === tabId);
      let nextPath = "/";

      if (currentTabs.length > 1) {
        let nextTab;
        if (currentIndex < currentTabs.length - 1) {
          nextTab = currentTabs[currentIndex + 1];
        } else {
          nextTab = currentTabs[currentIndex - 1];
        }
        nextPath = nextTab.path;
      }

      navigate({ to: nextPath });
    }

    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
  };

  return {
    tabs,
    closeTab,
    currentTabId: id,
  };
};
