import chalk from "chalk";
import * as context from "../context.mjs";
import * as input from "../input.mjs";
import * as git from "../git.mjs";
import { Task } from "./Task.mjs";

export async function create(
  options = {
    current: false,
    select: false,
  }
) {
  const config = await context.manifest.getConfig();

  if (config === null) {
    throw new Error("No config found for current project");
  }

  // title is Required
  const title = await input.requiredText(
    `${chalk.blueBright("(Required)")} Enter Title of Task : `,
    ""
  );

  //description is Optional
  let description = "";
  const needDescription = await input.confirm(`Need Description? : `, true);
  if (needDescription) {
    description = await input.enterText(`Enter Description : `, "");
  }

  //prepare base branch
  let baseBranch;
  if (options.current) {
    const branchList = git.getBranchList();
    const currentBranch = git.getCurrentBranchName();
    console.log(branchList, currentBranch);
    const remoteOfCurrentBranch = branchList.find((remoteBranch) =>
      remoteBranch.includes(currentBranch)
    );

    if (!remoteOfCurrentBranch) {
      console.warn(
        `${chalk.yellow(
          "Seems there isn't remote branch matching with current branch. Please check if current branch is pushed"
        )}`
      );
      baseBranch = await git.selectBranch(
        `${chalk.yellow("Fallback")}, Select Base Branch`,
        true
      );
    } else {
      baseBranch = remoteOfCurrentBranch;
    }
  } else {
    baseBranch = await git.selectBranch("Select Base Branch", true);
  }

  // create task and record
  const task = new Task(title, description, baseBranch);
  const taskKey = task.key;

  await context.manifest.setHistory(taskKey, task.objectify());

  // --select checkout to new branch (branch name base on task title)
  if (options.select) {
    //@TODO feature , chore ,update ... selection
    const taskBranch = git.toBranchName(title);
    await git.create(taskBranch, baseBranch);
    await git.checkout(taskBranch);
    await git.push(true);
  }
  return taskKey;
}
