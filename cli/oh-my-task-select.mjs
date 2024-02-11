#!/usr/bin/env node

import { Command } from "commander";
import { select } from "../src/task/select.mjs";

async function selectCommand() {
  const program = new Command();
  program
    .name("oh-my-task-list")
    .option("-c, --current", "Set base branch to current branch(remote)")
    .description(`Find Tasks and list up.`);

  program.parse();

  const options = program.opts();
  const selectOptions = {
    current: false,
  };

  if (options.current) {
    selectOptions.current = options.current;
  }

  await select(selectOptions);
}

await selectCommand().catch((error) => console.error(error));
