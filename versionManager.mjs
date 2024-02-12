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
  console.log(PACKAGE);
  await fs.writeFile("./package.json", JSON.stringify(PACKAGE, null, 2));
  execSync(`git add .`, { stdio: "inherit" });
  execSync(`git commit -m "v${version}"`, { stdio: "inherit" });
  execSync(`git push`, { stdio: "inherit" });
  execSync(`git tag -a v${version} -m "${version}"`, { stdio: "inherit" });
  execSync(`git push --follow-tags`, { stdio: "inherit" });
}

run();
