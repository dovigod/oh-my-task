#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";

async function listCommand() {
  const program = new Command();
  program
    .name("oh-my-task-list")
    .option("-a, --all", `list up all todos including "complete" status`)
    .description(`Find Tasks and list up.`);

  program.parse();

  const options = program.opts();
  console.log(options);
}

await listCommand().catch((error) => console.error(error));
