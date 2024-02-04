#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

async function main() {
  const program = new Command();
  program.name("oh-my-cli-init")
    .description(`Initialize settings for current project.\n
    ${chalk.green("(Entry Command for every project)")}`);

  program.option("-g, --global", "Use global config");
  program.parse();
}

await main().catch((err) => console.error(err));
