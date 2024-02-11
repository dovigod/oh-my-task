import * as context from "../context.mjs";
import * as input from "../input.mjs";
import * as git from "../git.mjs";
import { Task } from "./Task.mjs";
import { TASK_STATUS } from "../status.mjs";
import chalk from "chalk";
import { emoji } from "../markdown.mjs";

export async function select() {
  const taskCollection = await context.manifest.getHistory();

  const tasks = Object.values(taskCollection).map((task) => {
    return { value: Task.build(task), name: task.title };
  });

  const selectedTask = await input.select(
    "Select Task to work :",
    tasks,
    "123"
  );

  const taskBranch = git.toBranchName(selectedTask.title);

  await git.create(taskBranch, selectedTask.baseBranch);
  await git.checkout(taskBranch);
  await git.push(true);
  selectedTask.select(TASK_STATUS.WORKING);

  console.log(
    `Successfully Selected Task ${chalk.blueBright(selectedTask.key)}`
  );
  console.log(
    `${emoji[TASK_STATUS.WORKING]} HAPPY CODING!! ${emoji[TASK_STATUS.WORKING]}`
  );
}
