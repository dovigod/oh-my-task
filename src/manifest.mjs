/**
 * @typedef { import ('./types').GlobalConfig } GlobalConfig
 * @typedef { import ('./types').LocalConfig } LocalConfig
 */

import fs from "fs/promises";
import { parse, stringify } from "yaml";
import { readFileSync } from "fs";
import chalk from "chalk";
import * as input from "./input.mjs";
import os from "os";
import path from "path";
import crypto from "node:crypto";

const PACKAGE = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf-8")
);

/**
 * History is a file which records every task-related stuffs user creates
 * *NOTE* History file MUST be ignored by git (if history path is manually provided)
 */

/**
 * Config
 */
export class Manifest {
  _config = null;
  _history = null;
  #PACKAGE = {};

  constructor(configPath, historyPath) {
    this.configPath = configPath;
    this.historyPath = historyPath;
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
   * create ".omc.yaml" (local project manifest file)
   * @returns { Promise<void> }
   */
  async createConfig(
    settings = {
      name: this.#PACKAGE.name,
    }
  ) {
    const previousConfig = await this.getConfig().catch(() => null);

    const name = settings.name;
    const projectKey = crypto.createHash("sha256").update(name).digest("hex");

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
    heading = await input.enterText("Enter headings of Task: ", heading);

    const config = {
      project: {
        key: projectKey,
        name,
        pathToRecord,
        heading,
      },
    };

    await fs.writeFile(this.configPath, stringify(config)).catch(console.error);
    console.log(`Config saved to ${this.configPath}`);
  }

  // history related methods

  setHistoryPath(historyPath) {
    this.historyPath = historyPath;
  }

  async #createGlobalFolder() {
    const folderPath = path.dirname(this.historyPath);
    return fs.mkdir(folderPath, { recursive: true });
  }
  async getHistory() {
    if (this._history === null) {
      const fileContent = await fs
        .readFile(this.historyPath, "utf8")
        .catch(() => null);

      if (fileContent === null) {
        return null;
      }

      const historyCollection = parse(fileContent);
      const { project } = await this.getConfig();

      const history = historyCollection[project.key];
      this._history = history;
    }

    return this._history;
  }

  async #getEntireHistory() {
    const fileContent = await fs
      .readFile(this.historyPath, "utf8")
      .catch(() => null);

    if (fileContent === null) {
      return null;
    }

    const historyCollection = parse(fileContent);
    return historyCollection;
  }

  async setHistory(taskKey, value) {
    const fileContent = await fs
      .readFile(this.historyPath, "utf8")
      .catch((e) => "");

    const historyCollection = parse(fileContent) ?? {};
    const { project } = await this.getConfig();

    if (!historyConfig[project.key]) {
      historyConfig[project.key] = {};
    }

    historyCollection[project.key][taskKey] = value;
    return fs.writeFile(this.historyPath, stringify(historyCollection));
  }

  /**
   * Initialize project history (history.yaml).
   * This method is only used for initializing project.
   * MUST NOT to use while developing general task life cycle.
   * @returns { void }
   */
  async initializeHistory() {
    await this.#createGlobalFolder();
    const history = await this.getHistory();
    if (history !== null) {
      console.warn("Current history file:", history);
      const overwrite = await input.confirm(this.historyPath);
      if (!overwrite) {
        return;
      }
    }

    await fs.writeFile(this.historyPath, stringify({}));
  }

  /**
   * check whether current workspace has environment to run command.
   * @returns { boolean }
   */
  async isExecutable() {
    const config = await this.getConfig();
    const history = await this.#getEntireHistory();

    return config && history;
  }
}
