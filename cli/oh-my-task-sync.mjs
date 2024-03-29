#!/usr/bin/env node
import { Command } from "commander";
import { sync } from "../src/task/sync.mjs";

async function SyncCommand() {
  const program = new Command();
  program
    .name("oh-my-task-sync")
    .description(
      `Sync Histories to file specified at project configuration file(.omt.yaml)`
    );
  program.parse();

  await exec();
}

await SyncCommand().catch((err) => console.error(err));

async function exec() {
  await sync();
}
