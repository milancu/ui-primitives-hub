#!/usr/bin/env node

import {program} from "commander";
import chalk from "chalk";
import figlet from "figlet";
import {handleError} from "./ui.js";
import {authFlow} from "./auth.js";

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


program.parseAsync(process.argv).catch(handleError);
