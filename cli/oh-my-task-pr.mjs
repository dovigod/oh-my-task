#!/usr/bin/env node

import { Command } from "commander";
import { pullRequest } from "../src/task/pr.mjs";

async function pullRequestCommand() {
  const program = new Command();
  program
    .name("oh-my-task-pr")
    .description(
      `Request Pull Request from currently working Task (current branch) to Base branch`
    );

  program.parse();

  await pullRequest();
}

await pullRequestCommand().catch((error) => console.error(error));
