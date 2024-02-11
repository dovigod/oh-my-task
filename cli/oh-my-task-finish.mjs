#!/usr/bin/env node

import { Command } from "commander";
import { finish } from "../src/task/finish.mjs";

async function finishCommand() {
  const program = new Command();
  program
    .name("oh-my-task-end")
    .description(
      "Finish Task and checkout to base branch. This command is use to end Task life cycle"
    );

  program.parse();

  await finish();
}

await finishCommand().catch((error) => console.error(error));
