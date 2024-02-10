#!/usr/bin/env node

import { Command } from "commander";
import * as git from "../src/git.mjs";

async function test() {
  const program = new Command();
  program.name("oh-my-task-git").description(`testing git command`);

  program.parse();

  const options = program.opts();

  await git.push(true);
}

await test().catch((error) => console.error(error));
