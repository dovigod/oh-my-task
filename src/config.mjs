/**
 * @typedef { import ('./types').GlobalConfig } GlobalConfig
 * @typedef { import ('./types').LocalConfig } LocalConfig
 */

import fs from "fs/promises";
import { parse, stringify } from "yaml";
import { readFileSync } from "fs";
import chalk from "chalk";
import * as input from "./cli-input.mjs";

const PACKAGE = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
);

export class Config {
  _config = null;
  _readMe = null;
  #PACKAGE = {};

  constructor(configPath, readMePath) {
    this.configPath = configPath;
    this.readMePath = readMePath;
    this.#PACKAGE = PACKAGE;
  }

  /**
   * @returns { Promise<LocalConfig | null> } objectified Local configuration
   */
  async getConfig() {
    if (this._config === null) {
      const rawConfig = await fs
        .readFile(this.configPath, "utf8")
        .catch(() => null);

      if (rawConfig === null) {
        return null;
      }
      const config = parse(rawConfig);

      // @TODO maybe?? validation checks or version checks or whatever..
      this._config = config;
    }
    return this._config;
  }

  /**
   * **NOTE** Re-runing this function will overwrite current configuration which may result unexpected behavior.
   *
   * create ".ohmycli.yaml" (manifest file)
   * @returns { Promise<void> }
   */
  async createConfig(
    settings = {
      name: this.#PACKAGE.name,
      pathToRecord: "./README.md",
      heading: "Todo List",
    }
  ) {
    const previousConfig = await this.getConfig().catch(() => null);

    const name = settings.name;
    let pathToRecord = settings.pathToRecord;
    let heading = settings.heading;

    if (previousConfig) {
      console.warn(
        `${chalk.yellow(
          "Seems you are trying to overwrite config file which might lead to unexpected behavior.\nWish you know what you are doing."
        )}`
      );
    }

    pathToRecord = await input.enterText(
      "Enter path to record (baseDir: root of project): ",
      pathToRecord
    );
    heading = await input.enterText("Enter headings of To Do List: ", heading);

    const config = {
      project: {
        name,
        pathToRecord,
        heading,
      },
    };

    await fs.writeFile(this.configPath, stringify(config)).catch(console.error);
    console.log(`Config saved to ${this.configPath}`);
  }
}
