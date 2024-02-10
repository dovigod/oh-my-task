#!/usr/bin/env node
import { Command } from "commander";
import { create } from "../src/task/create.mjs";

async function createCommand() {
  const program = new Command();
  program
    .name("oh-my-task-create")
    .option("-c, --current", "Set base branch to current branch(remote)")
    .description(`Creates Task to work.`);
  program.parse();

  const options = program.opts();

  const createOptions = {
    current: false,
  };

  if (options.current) {
    createOptions.current = options.current;
  }

  await create(createOptions);
}

await createCommand().catch((err) => console.error(err));
