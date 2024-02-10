#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import * as context from "../src/context.mjs";

async function main() {
  const program = new Command();
  program.name("oh-my-task-init")
    .description(`Initialize settings for current project.\n
    ${chalk.green("(Entry Command for every project)")}`);

  program.option("-g, --global", `Setup History file on global location.`);
  program.parse();

  const options = program.opts();

  await exec(options);
}

await main().catch((err) => console.error(err));

async function exec(
  options = {
    global: false,
  }
) {
  if (options.global) {
    context.manifest.initializeHistory();
    return;
  } else {
    await context.manifest.createConfig();
  }
}
