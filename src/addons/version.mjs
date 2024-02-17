import boxen from "boxen";
import chalk from "chalk";
import semver from "semver";
import pkgJson from "package-json";
import semverDiff from "semver-diff";
import { readFileSync } from "fs";

import { capitalizeFirstLetter } from "../utils/string.mjs";

export async function checkUpdate() {
  const PACKAGE = JSON.parse(
    readFileSync(new URL("../../package.json", import.meta.url), "utf-8")
  );

  const { name, version } = PACKAGE;
  const { version: latestVersion } = await pkgJson(name);
  // check if local package version is less than the remote version
  const updateAvailable = semver.lt(version, latestVersion);

  if (updateAvailable) {
    let updateType = "";

    // check the type of version difference which is usually patch, minor, major etc.
    let verDiff = semverDiff(version, latestVersion);

    if (verDiff) {
      updateType = capitalizeFirstLetter(verDiff);

      switch (updateType) {
        case "Major": {
          updateType = chalk.greenBright(updateType);
          break;
        }
        case "Minor": {
          updateType = chalk.yellow(updateType);
          break;
        }
        case "Patch": {
          updateType = chalk.white(updateType);
          break;
        }
      }
    }

    const msg = {
      updateAvailable: `${updateType} update available ${chalk.dim(
        version
      )} → ${chalk.green(latestVersion)}`,
      runUpdate: `Run ${chalk.cyan(`npm i -g ${name}`)} to update`,
    };

    // notify the user about the available udpate
    console.log(
      boxen(`${msg.updateAvailable}\n${msg.runUpdate}`, {
        margin: 1,
        padding: 1,
        align: "center",
      })
    );
  }
}
