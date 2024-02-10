#!/usr/bin/env node
import { Command } from "commander";
import { create } from "../src/task/create.mjs";

async function createCommand() {
  const program = new Command();
  program.name("oh-my-task-create").description(`Creates Task to work.`);
  program.parse();

  await create();
}

await createCommand().catch((err) => console.error(err));
