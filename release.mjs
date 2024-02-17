import { execSync } from "child_process";
import chalk from "chalk";

const RELEASE_CREDENTIAL_BRANCH = "main";

function validation() {
  const result = {
    success: true,
    msg: "",
  };
  //1. should be main branch
  const currentBranchName = execSync(`git branch --show-current`, {
    encoding: "utf8",
  }).trim();
  if (currentBranchName !== RELEASE_CREDENTIAL_BRANCH) {
    result.success = false;
    result.msg = "current branch is not allowed to release";
  }

  return result;
}

async function exec() {
  const res = validation();

  if (!res.success) {
    throw chalk.red(`Validation Error : ${res.msg}`);
  }

  execSync(`pnpm standard-version`);
  execSync(`git push --follow-tags`);
}

exec();
