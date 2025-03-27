import fs from "fs-extra";
import path from "path";

const CONFIG_DIR = path.join(process.cwd(), "/");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");
const API_BASE = process.env.API_BASE ?? "http://localhost:3000";


export const config = {
  set: async (values) => {
    const current = await config.read();
    const merged = {...current, ...values};

    await fs.ensureDir(CONFIG_DIR);
    await fs.writeJson(CONFIG_FILE, merged, {
      spaces: 2,
      mode: 0o600
    });
  },

  read: async () => {
    try {
      return await fs.readJson(CONFIG_FILE);
    } catch {
      return {};
    }
  },

  setToken: async (token) => config.set({token}),
  getToken: async () => {
    const data = await config.read();
    return data.token;
  },

  hasToken: async () => {
    return !!(await config.getToken());
  },

  setProjectId: async (projectId) => config.set({projectId}),
  getProjectId: async () => {
    const data = await config.read();
    return data.projectId;
  },

  getConfigPath: () => CONFIG_FILE,
  exists: async () => fs.pathExists(CONFIG_FILE),

  getOutputDir: async () => {
    const data = await config.read();
    return data.outputDir;
  },

  getApiBase: () => API_BASE,

  getPackageManager: async () => {
    const data = await config.read();
    return data.packageManager;
  }
};