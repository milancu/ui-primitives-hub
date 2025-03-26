import chalk from "chalk";
import ora from "ora";

const THEME = {
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.cyan
};

export const spinner = (text) => {
  return ora({
    text,
    spinner: "dots",
    color: "cyan"
  });
};

export const handleError = (error) => {
  console.log(`Error: ${error.message}`, "error");
  process.exit(1);
};