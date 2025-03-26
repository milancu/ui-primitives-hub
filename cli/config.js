import fs from "fs-extra";
import path from "path";
import os from "os";

const CONFIG_DIR = path.join(os.homedir(), ".ui-primitives");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export const config = {
  setToken: async (token) => {
    await fs.ensureDir(CONFIG_DIR);
    await fs.writeJson(CONFIG_FILE, {token}, {spaces: 2, mode: 0o600});
  },

  getToken: async () => {
    const data = await fs.readJson(CONFIG_FILE);
    return data.token;
  },

  hasToken: async () => {
    return fs.pathExists(CONFIG_FILE);
  }
};