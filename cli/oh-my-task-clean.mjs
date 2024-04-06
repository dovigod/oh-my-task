#!/usr/bin/env node

import { Command } from "commander";
import { clean } from "../src/task/clean.mjs";

async function cleanCommand() {
  const program = new Command();
  program
    .name("oh-my-task-clean")
    .description("Clean project task history from global history")
    .option("-c, --complete", "Clean all progresses with state of complete")
    .option("-i, --idle", "Clean all progresses with state of idle");

  program.parse();

  const options = program.opts();

  const cleanOptions = {
    selection: true,
    complete: false,
    idle: false,
  };

  if (options.idle) {
    cleanOptions.idle = true;
  }

  if (options.complete) {
    cleanOptions.complete = true;
  }

  if (cleanOptions.idle || cleanOptions.complete) {
    cleanOptions.selection = false;
  }

  await clean(cleanOptions);
}

await cleanCommand().catch((error) => console.error(error));
