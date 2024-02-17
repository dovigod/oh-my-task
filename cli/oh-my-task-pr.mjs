#!/usr/bin/env node

import { Command } from "commander";
import { pullRequest } from "../src/task/pr.mjs";

async function pullRequestCommand() {
  const program = new Command();
  program
    .name("oh-my-task-pr")
    .option(
      "-s , --sync",
      "Sync task list and inject changes in previous commit."
    )
    .description(
      `Request Pull Request from currently working Task (current branch) to Base branch`
    );

  program.parse();

  const options = program.opts();

  const prOptions = {
    sync: false,
  };

  if (options.sync) {
    prOptions.sync = true;
  }

  await pullRequest(prOptions);
}

await pullRequestCommand().catch((error) => console.error(error));
