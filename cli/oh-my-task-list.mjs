#!/usr/bin/env node

import { Command } from "commander";
import { list } from "../src/task/list.mjs";

async function listCommand() {
  const program = new Command();
  program
    .name("oh-my-task-list")
    .option("-a, --all", `list up all todos including "complete" status`)
    .description(`Find Tasks and list up.`);

  program.parse();

  const options = program.opts();

  const listOptions = {
    all: false,
  };

  if (options.all) {
    listOptions.all = options.all;
  }

  await list(listOptions);
}

await listCommand().catch((error) => console.error(error));
