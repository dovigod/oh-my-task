import * as input from "./input.mjs";
import { execSync, spawnSync } from "child_process";

export async function createBranch(branch, baseBranch = "origin/develop") {
  const createResult = spawnSync("git", ["branch", branch, baseBranch], {
    stdio: ["inherit", process.stdout, process.stderr],
  });
  if (createResult.status !== 0) {
    throw new Error("Failed to create branch");
  }

  return branch;
}

export async function checkout(branch) {
  const checkoutResult = spawnSync("git", ["checkout", branch], {
    stdio: "inherit",
  });
  if (checkoutResult.status !== 0) {
    throw new Error("Failed to checkout branch");
  }
  return branch;
}
