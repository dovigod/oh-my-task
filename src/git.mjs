import * as input from "./input.mjs";
import { execSync, spawnSync } from "child_process";

function git(
  command,
  params,
  options = {
    encoding: "utf-8",
    stdio: "inherit",
  }
) {
  if (params instanceof Array) {
    return spawnSync("git", [command, ...params], options);
  } else {
    return spawnSync("git", [command, params], options);
  }
}

export async function create(branch, baseBranch = "origin/develop") {
  const createResult = git("branch", [branch, baseBranch], {
    stdio: ["inherit", process.stdout, process.stderr],
  });

  if (createResult.status !== 0) {
    throw new Error("Failed to create branch");
  }

  return branch;
}

export async function checkout(branch) {
  const checkoutResult = git("checkout", branch);

  if (checkoutResult.status !== 0) {
    throw new Error("Failed to checkout");
  }
  return branch;
}

export async function push(withSettingCurrentBranchUpStream = false) {
  let pushResult;

  if (withSettingCurrentBranchUpStream) {
    const currentBranch = getCurrentBranchName();

    pushResult = git("push", ["-u", "origin", currentBranch], {
      encoding: "utf-8",
      stdio: "inherit",
    });
  } else {
    pushResult = git("push");
  }

  if (pushResult.status !== 0) {
    throw new Error("Failed to push");
  }

  return true;
}

export async function pull() {
  const pullResult = git("pull");
  if (pullResult.status !== 0) {
    throw new Error("Failed to pull");
  }

  return true;
}

export async function fetch() {
  const result = git("fetch");

  if (result.status !== 0) {
    throw new Error("Failed to fetch prune");
  }
}

export async function merge(branch) {
  const mergeResult = git("merge", branch);

  if (result.status !== 0) {
    throw new Error("Failed to merge");
  }
}

/**
 *
 * @param {string} remoteBranch - origin/${branchName}
 */
export async function setUpStream(remoteBranch) {
  const setUpStreamResult = git("branch", ["--set-upstream-to", remoteBranch]);

  if (setUpStreamResult.status !== 0) {
    throw new Error("Failed to set upstream");
  }
}

export function getCurrentBranchName() {
  const output = execSync(`git branch --show-current`, { encoding: "utf8" });
  return output.trim();
}

export async function selectBranch(message = "Select Branch", remote = true) {
  const command = remote
    ? "git branch -r"
    : "git branch --format='%(refname:short)'";

  const branchRetrieveResult = execSync(command, {
    encoding: "utf8",
  });

  const branches = branchRetrieveResult
    .split("\n")
    .filter((branch) => branch !== "" && !branch.includes("HEAD"))
    .map((branch) => branch.trim());

  return input.select(
    message,
    branches.map((branch) => ({ value: branch })),
    ["value"]
  );
}

export function getBranchList(remote = true) {
  const command = remote
    ? "git branch -r"
    : "git branch --format='%(refname:short)'";

  const branchRetrieveResult = execSync(command, {
    encoding: "utf8",
  });

  const branches = branchRetrieveResult
    .split("\n")
    .filter((branch) => branch !== "" && !branch.includes("HEAD"))
    .map((branch) => branch.trim());

  return branches;
}

/**
 *
 * https://git-scm.com/docs/git-check-ref-format
 *  . \ @ { } ? [ ] * space ~  ^ : ; ! ' " # $ % & ( ) |-> ''
 *
 */
export function toBranchName(title) {
  let name = title.replace(/[.\\@{}?\[\]\*~^:;!'"#$%^&)(|]/g, "");
  name = name.replaceAll(" ", "-");
  return name.toLowerCase();
}
