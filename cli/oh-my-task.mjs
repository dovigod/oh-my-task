#!/usr/bin/env node

import { Command } from "commander";
import { readFileSync } from "fs";
import chalk from "chalk";

const PACKAGE = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
);

async function runner() {
  const program = new Command();

  console.log(`
  ${chalk.redBright(` ██████  ██   ██`)}     ${chalk.greenBright(
    `███    ███ ██    ██`
  )}     ${chalk.blueBright(`████████  █████  ███████ ██   ██`)}   ${chalk.cyan(
    `██`
  )}\n
  ${chalk.redBright(`██    ██ ██   ██`)}     ${chalk.greenBright(
    `████  ████  ██  ██`
  )}      ${chalk.blueBright(
    `   ██    ██   ██ ██      ██  ██`
  )}    ${chalk.cyan(`██`)}\n
  ${chalk.redBright(`██    ██ ███████`)}     ${chalk.greenBright(
    `██ ████ ██   ████`
  )}       ${chalk.blueBright(
    `   ██    ███████ ███████ █████`
  )}     ${chalk.cyan(`██`)}\n
  ${chalk.redBright(`██    ██ ██   ██`)}     ${chalk.greenBright(
    `██  ██  ██    ██`
  )}        ${chalk.blueBright(
    `   ██    ██   ██      ██ ██  ██`
  )}    ${chalk.cyan(``)}\n
  ${chalk.redBright(` ██████  ██   ██`)}     ${chalk.greenBright(
    `██      ██    ██`
  )}        ${chalk.blueBright(
    `   ██    ██   ██ ███████ ██   ██`
  )}   ${chalk.cyan(`██`)}\n`);

  program
    .name(PACKAGE.name)
    .description(PACKAGE.description)
    .version(PACKAGE.version);

  // commands

  program.command("init", "Initialize settings");
  program.command("create", "Create Task To Do");
  program.command("list", "List up todos");
  program.command("sync", "Synchronize tasks from history.yaml to syncTo file");
  program.command("select", "Select task to work");
  program.command(
    "pr",
    "Request Pull Request from current branch to Base branch"
  );
  program.command(
    "finish",
    "Finish Task and checkout to base branch. This command is use to end Task life cycle"
  );

  // parsings
  program.showHelpAfterError(true);
  program.parse();
}

await runner().catch((e) => {});
