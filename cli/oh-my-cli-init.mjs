#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import * as context from "../src/context.mjs";

async function main() {
  const program = new Command();
  program.name("oh-my-cli-init")
    .description(`Initialize settings for current project.\n
    ${chalk.green("(Entry Command for every project)")}`);

  program.option("-g, --global", "Use global config");
  program.parse();

  await context.config.createConfig();
}

await main().catch((err) => console.error(err));
