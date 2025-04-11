import { create } from "zustand";

type AuthStore = {
  accessToken?: string;
  setAccessToken: (projectId?: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  setAccessToken: (accessToken) => set({ accessToken }),
}));
