import * as context from "../context.mjs";
import * as git from "../git.mjs";
import chalk from "chalk";

export async function pullRequest() {
  const notStagedList = await git.getUnStaged();
  const unTrackedList = await git.getUnTracked();
  if (notStagedList.length > 0 || unTrackedList.length > 0) {
    console.log(
      chalk.red("Not staged files:"),
      chalk.yellow("(Need to commit)")
    );
    console.log("\t%s", notStagedList.join("\n\t"));
    console.log(chalk.red("Untracked files:"), chalk.yellow("(Need to add)"));
    console.log("\t%s", unTrackedList.join("\n\t"));
    return;
  }

  const notSyncedCommits = await git.getUnSyncedCommits();
  if (notSyncedCommits.length > 0) {
    console.log(
      chalk.red("Not synced commits:"),
      chalk.yellow("(Need to push)")
    );
    console.log("\t%s", notSyncedCommits.join("\n\t"));
    return;
  }

  let taskCollection = await context.manifest.getHistory();
  const currentBranchName = git.getCurrentBranchName();

  const task = Object.values(taskCollection).find(
    (task) => task.title === currentBranchName
  );

  let baseBranch = task.baseBranch;

  if (!baseBranch) {
    baseBranch = await git.selectBranch(
      `Select a ${chalk.bold.greenBright("base branch")} to merge`,
      true
    );
  }

  // merge
  await git.merge(baseBranch);

  // create pull request
  await git.pullRequest(baseBranch, task.title);

  await git.pullRequest(baseBranch, title);
}
