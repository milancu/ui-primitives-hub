// src/cli/auth.ts
import chalk from "chalk";
import ora from "ora";
import {config} from "./config.js";

const API_BASE = "http://localhost:3000";

export const authFlow = async () => {
  const spinner = ora(chalk.cyan("Initiating device flow...")).start();

  try {
    const response = await fetch(`${API_BASE}/auth/device/code`, {
      method: "POST",
      headers: {"Content-Type": "application/json"}
    });

    if (!response.ok) throw new Error("Failed to start device flow");
    const data = await response.json();

    spinner.stop();

    console.log(`
${chalk.bold.cyan("UI Primitives Hub Authentication")}
    
1. Open ${chalk.underline.cyan(data.verification_uri)}
2. Enter code: ${chalk.bold.magenta(data.user_code)}
    
${chalk.dim(`This code expires in ${Math.floor(data.expires_in / 60)} minutes`)}
    `);

    const pollSpinner = ora(chalk.cyan("Waiting for authentication...")).start();
    const startTime = Date.now();

    while (Date.now() - startTime < data.expires_in * 50000) {
      await new Promise(resolve => setTimeout(resolve, 4000));

      try {
        const pollResponse = await fetch(`${API_BASE}/auth/device/poll`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({device_code: data.device_code})
        });



        if (pollResponse.ok) {
          const response = await pollResponse.json();
          if (response.status === 'approved'){
            await config.setToken(response.token);
            pollSpinner.succeed(chalk.green("Authentication confirmed!"));
            return;
          }
        }

        // const error = await pollResponse.json();
        // if (error.error !== "authorization_pending") throw error;
      } catch (error) {
        pollSpinner.stop();
        console.error(chalk.red("✗"), error.error);
        process.exit(1);
      }
    }

    throw new Error("Authentication timed out");
  } finally {
    spinner.stop();
  }
};