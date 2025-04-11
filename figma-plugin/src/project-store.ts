import { create } from "zustand";

type ProjectStore = {
  projectId?: string;
  setProjectId: (projectId?: string) => void;
};

export const useProjectStore = create<ProjectStore>((set) => ({
  setProjectId: (projectId) => set({ projectId }),
}));
