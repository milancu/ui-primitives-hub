#!/usr/bin/env node

import {program} from "commander";
import chalk from "chalk";
import figlet from "figlet";
import {handleError, spinner} from "./ui.js";
import {authFlow} from "./auth.js";
import {config} from "./config.js";
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import dotenv from "dotenv";
import { execa } from 'execa';
import {UTILS_CONTENT, UTILS_PATH} from "./constants.js";

dotenv.config();

async function getInstalledPackages(packageManager) {
  try {
    const { stdout } = await execa(packageManager, ['list', '--depth=0', '--parseable']);
    return stdout.split('\n')
      .filter(line => line.includes('/node_modules/'))
      .map(line => {
        const packageName = line.split('/node_modules/').pop();
        return packageName.startsWith('@')
          ? packageName.split('/').slice(0, 2).join('/')
          : packageName.split('/')[0];
      });
  } catch (error) {
    console.error(chalk.yellow('Warning: Failed to check installed packages'));
    return [];
  }
}

program
  .name("ui-primitives")
  .version("1.0.0")
  .description("UI Primitives Hub - Component Generation CLI");

console.log(
  chalk.white(figlet.textSync("UI Primitives Hub CLI", {horizontalLayout: "full"}))
);

program
  .command("login")
  .description("Authenticate with UI Primitives Hub")
  .action(async () => {
    try {
      await authFlow();
    } catch (error) {
      handleError(error);
    }
  });

program
  .command("init")
  .description("Initialize project configuration")
  .option("-p, --project <id>", "Set active project ID")
  .option("-o, --output <path>", "Output directory", "src/components")
  .option("--package-manager <manager>", "Set package manager (pnpm/npm/yarn)")
  .option("-t, --token <token>", "Set authentication token (advanced)")
  .action(async (options) => {
    try {
      const currentConfig = await config.read();
      const updates = {};

      if (!(await config.hasToken())) {
        console.log(chalk.yellow("\nAuthentication required!"));
        await authFlow();
      }

      if (options.project) {
        updates.projectId = options.project;
      } else if (!currentConfig.projectId) {
        const answers = await inquirer.prompt([
          {
            type: "input",
            name: "projectId",
            message: "Enter your Project ID:",
            validate: input => !!input.trim() || "Project ID is required"
          }
        ]);
        updates.projectId = answers.projectId;
      }

      updates.outputDir = options.output || currentConfig.outputDir || "src/components";

      if (options.packageManager) {
        updates.packageManager = options.packageManager;
      } else if (!currentConfig.packageManager) {
        const answers = await inquirer.prompt([
          {
            type: "list",
            name: "packageManager",
            message: "Enter your package manager:",
            choices: ["pnpm", "npm", "yarn"],
            default: currentConfig.packageManager || "pnpm",
            validate: input => !!input.trim() || "Package manager is required"
          }
        ]);
        updates.packageManager = answers.packageManager;
      }

      if (Object.keys(updates).length > 0) {
        await config.set(updates);
      }

      const finalConfig = await config.read();
      console.log(chalk.green("\n✓ Configuration initialized successfully"));
      console.log(chalk.dim(`Project ID:    ${finalConfig.projectId || updates.projectId}`));
      console.log(chalk.dim(`Output directory: ${finalConfig.outputDir || updates.outputDir}`));
      console.log(chalk.dim(`Config path:   ${config.getConfigPath()}`));
      console.log(chalk.dim(`Package manager:   ${finalConfig.packageManager || updates.packageManager}`));

    } catch (error) {
      console.error(chalk.red("✗ Error initializing configuration:"), error.message);
      process.exit(1);
    }
  });

program
  .command("add")
  .description("Generate a UI component")
  .requiredOption("-c, --component <name>", "Component name to generate")
  .option("-f, --force", "Overwrite existing files")
  .action(async (options) => {
    try {
      const {component, force} = options;
      const loading = spinner(`Generating ${chalk.bold(component)}...`);

      if (!(await config.exists())) {
        throw new Error(
          "Configuration not found. Please run " +
          chalk.bold("ui-primitives init") + " first."
        );
      }

      const projectId = await config.getProjectId();
      if (!projectId) {
        throw new Error("No project configured. Run 'config' first.");
      }

      const outputDir = await config.getOutputDir();
      await fs.ensureDir(outputDir);

      loading.start();
      const response = await fetch(
        `${config.getApiBase()}/projects/${projectId}/components/${component}/code`,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${await config.getToken()}`
          }
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${error}`);
      }

      // 4. Uložit soubor
      const fileName = `${component}.tsx`;
      const filePath = path.join(outputDir, fileName);

      if (await fs.pathExists(filePath) && !force) {
        loading.stop();
        const {overwrite} = await inquirer.prompt({
          type: "confirm",
          name: "overwrite",
          message: `File ${fileName} exists. Overwrite?`,
          default: false
        });

        if (!overwrite) {
          console.log(chalk.yellow("✗ Operation cancelled"));
          return;
        }
      }

      await fs.writeFile(filePath, await response.text());
      loading.succeed();

      console.log(
        chalk.green(`✓ Component ${chalk.bold(component)} created at:`),
        chalk.dim(filePath)
      );

      const utilsPath = path.join(process.cwd(), UTILS_PATH);
      if (!fs.existsSync(utilsPath)) {
        const utilsSpinner = spinner('Creating utilities file...');
        utilsSpinner.start();

        await fs.ensureDir(path.dirname(utilsPath));
        await fs.writeFile(utilsPath, UTILS_CONTENT);

        utilsSpinner.succeed(
          chalk.green('✓ Created utilities file:') +
          chalk.dim(' src/lib/utils.ts')
        );
      }

      const dependencies = [
        "@base-ui-components/react",
        "clsx",
        "tailwind-merge"
      ]

      if (dependencies.length > 0) {
        const packageManager = await config.getPackageManager();
        const installedPackages = await getInstalledPackages(packageManager);

        const missingDependencies = dependencies.filter(
          dep => !installedPackages.includes(dep)
        );

        if (missingDependencies.length > 0) {
          const installSpinner = spinner(
            `Installing ${missingDependencies.length} missing dependencies...`
          );

          try {
            installSpinner.start();
            await execa(packageManager, ['add', ...missingDependencies], {
              stdio: 'inherit'
            });
            installSpinner.succeed(
              chalk.green('Successfully installed missing dependencies')
            );
          } catch (error) {
            installSpinner.fail('Failed to install dependencies');
            console.error(chalk.red(error.shortMessage));
          }
        } else {
          console.log(chalk.green('✓ All dependencies are already installed'));
        }
      }

    } catch (error) {
      handleError(error);
    }
  });

program.parseAsync(process.argv).catch(handleError);
