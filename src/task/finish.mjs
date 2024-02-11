import * as context from "../context.mjs";
import * as git from "../git.mjs";
import { TASK_STATUS, TASK_STATUS_TEXT } from "../status.mjs";
import { Task } from "../task/Task.mjs";

export async function finish() {
  let taskCollection = await context.manifest.getHistory();

  const currentBranchName = git.getCurrentBranchName();

  let task = Object.values(taskCollection).find(
    (task) => git.toBranchName(task.title) === currentBranchName
  );

  task = Task.build(task);
  // set status to complete
  task.finish();
  await context.manifest.setHistory(task.key, task.objectify());

  // git actions start

  //get branch which to checkout
  const seperatorIdx = task.baseBranch.indexOf("/");
  const localBaseBranch = task.baseBranch.slice(seperatorIdx + 1);

  let baseTask = Object.values(taskCollection).find(
    (task) => localBaseBranch === git.toBranchName(task.title)
  );

  if (baseTask) {
    baseTask = Task.build(baseTask);
    baseTask.select();

    const branchToCheckout = git.toBranchName(baseTask.title);
    await git.checkout(branchToCheckout);
    await git.fetch();
    await git.pull();
  } else {
    // probably, base task is original branch made by git or something which user manually created.
    // just set task status -> complete and let user to select which branch to move on.
    const branchToCheckout = await git.selectBranch(
      "Select Branch to checkout:",
      false
    );
    await git.checkout(branchToCheckout);
    return;
  }
  let baseBranch = task.baseBranch;
}
