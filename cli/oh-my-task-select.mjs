#!/usr/bin/env node

import { Command } from "commander";
import { select } from "../src/task/select.mjs";

async function selectCommand() {
  const program = new Command();
  program.name("oh-my-task-list").description(`Find Tasks and list up.`);

  program.parse();

  const options = program.opts();
  const selectOptions = {};

  await select();
}

await selectCommand().catch((error) => console.error(error));
