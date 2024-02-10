#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";

async function listCommand() {
  const program = new Command();
  program
    .name("oh-my-task-list")
    .option("-a, --all", `list up all todos including "complete" status`)
    .description(
      `Find Todos from ${chalk.bgMagenta(
        "README.md"
      )}(case sensitive) and list up`
    );

  program.parse();
}

await listCommand().catch((error) => console.error(error));
