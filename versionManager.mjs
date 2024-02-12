import { execSync } from "child_process";
import * as fs from "fs/promises";
import PACKAGE from "./package.json" assert { type: "json" };

function getCommandArgs() {
  const args = {};
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    // --foo-bar
    if (arg.slice(0, 2) === "--") {
      const longArg = arg.split("=");
      const longArgFlag = longArg[0].slice(2, longArg[0].length);
      const longArgValue = longArg.length > 1 ? longArg[1] : true;
      args[longArgFlag] = longArgValue;
    }
    // -foo
    else if (arg[0] === "-") {
      const flags = arg.slice(1, arg.length).split("");
      flags.forEach((flag) => {
        args[flag] = true;
      });
    }
  });

  return args;
}

function update(version, semverType) {
  let [major, minor, patch] = version.split(".");

  switch (semverType) {
    case "major": {
      major = Number(major) + 1;
      break;
    }
    case "minor": {
      minor = Number(minor) + 1;
      break;
    }
    case "patch": {
      patch = Number(patch) + 1;
      break;
    }
  }

  return [major, minor, patch].join(".");
}
async function run() {
  let { major, minor } = getCommandArgs();
  let target = "patch";

  if (major) {
    target = "major";
  }
  if (minor) {
    target = "minor";
  }

  let version = PACKAGE.version;
  version = update(version, target);
  PACKAGE.version = version;
  await fs.writeFile("./package.json", JSON.stringify(PACKAGE, null, 2));
  execSync(`git add .`, { stdio: "inherit" });
  execSync(`git commit -m "v${version}"`, { stdio: "inherit" });
  execSync(`git push`, { stdio: "inherit" });
  execSync(`git tag -a v${version} -m "${version}"`, { stdio: "inherit" });
  execSync(`git push --follow-tags`, { stdio: "inherit" });
}

run();
