import * as context from "../context.mjs";
import * as input from "../input.mjs";
import * as git from "../git.mjs";
import { Task } from "./Task.mjs";
import { TASK_STATUS } from "../status.mjs";
import chalk from "chalk";
import { emoji } from "../markdown.mjs";

export async function select(
  options = {
    current: false,
  }
) {
  const taskCollection = await context.manifest.getHistory();

  const tasks = Object.values(taskCollection).map((task) => {
    return { value: Task.build(task), name: task.title };
  });

  const selectedTask = await input.select("Select Task to work :", tasks, [
    "value",
    "name",
  ]);

  const taskBranch = git.toBranchName(selectedTask.title);
  let baseBranch = selectedTask.baseBranch;

  // set base branch to current branch
  if (options.current) {
    const branchList = git.getBranchList();
    const currentBranch = git.getCurrentBranchName();
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
    }
  }

  if (!options.current && !baseBranch) {
    baseBranch = await git.selectBranch(
      `Seems current Task does't have baseBranch.\n Please Select Base branch:`,
      true
    );
  }
  await git.create(taskBranch, baseBranch);
  await git.checkout(taskBranch);
  await git.push(true);
  selectedTask.select(TASK_STATUS.WORKING);

  await context.manifest.setHistory(selectedTask.key, selectedTask.objectify());

  console.log(
    `Successfully Selected Task ${chalk.blueBright(selectedTask.key)}`
  );
  console.log(
    `${emoji[TASK_STATUS.WORKING]} HAPPY CODING!! ${emoji[TASK_STATUS.WORKING]}`
  );
}
