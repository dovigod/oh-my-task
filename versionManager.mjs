import { execSync } from "child_process";
import * as fs from "fs/promises";
import PACKAGE from "./package.json" assert { type: "json" };

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
async function run(semverType = "patch") {
  let version = PACKAGE.version;
  version = update(version, semverType);
  PACKAGE.version = version;
  fs.writeFile("./package.json", JSON.stringify(PACKAGE, null, 2));
  execSync(`git add .`);
  execSync(`git commit -m "v${version}"`);
  execSync(`git push`);
}

run();
