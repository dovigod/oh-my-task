#!/usr/bin/env node

import { Command } from "commander";
import { readFileSync } from "fs";

const PACKAGE = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
);

const program = new Command();

program
  .name(PACKAGE.name)
  .description(PACKAGE.description)
  .version(PACKAGE.version);

// commands

program.command("init", "Initialize settings");
program.command("create", "Create Task To Do");
program.command("list", "List up todos");
program.command("sync", "Synchronize tasks from history.yaml to syncTo file");
program.command("list", "list up tasks");

// parsings
program.showHelpAfterError();
program.parse();
