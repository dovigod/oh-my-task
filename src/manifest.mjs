/**
 * @typedef { import ('./types').GlobalConfig } GlobalConfig
 * @typedef { import ('./types').LocalConfig } LocalConfig
 */

import fs from "fs/promises";
import fsSync from "fs";
import { parse, stringify } from "yaml";
import { readFileSync } from "fs";
import chalk from "chalk";
import * as input from "./input.mjs";
import path from "path";
import * as crypto from "./utils/crypto.mjs";

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
  // _user = null;
  #PACKAGE = {};

  constructor(configPath, historyPath) {
    this.configPath = configPath;
    this.historyPath = historyPath;
    // this.userConfigPath = userConfigPath;
    this.#PACKAGE = PACKAGE;
  }

  // async getUserConfig() {}

  // async createUserConfig() {
  //   await this.#createGlobalFolder();

  //   const userConfig = await this.getUserConfig();
  //   if (userConfig !== null) {
  //     console.log("Current user configuration exists:", userConfig);
  //     const overwrite = await input.confirm(`${chalk.red(
  //       "User configuration won't be able to recover after overwrite."
  //     )} Continue?`, false);
  //     if (!overwrite) {
  //       return;
  //     }
  //   }

  //   const gitToken = await input.token('Enter git api token (Link: https://github.com/settings/tokens) : ');

  // }
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
   * create ".omt.yaml" (local project manifest file)
   * @returns { Promise<void> }
   */
  async createConfig(
    settings = {
      name: this.#PACKAGE.name,
    }
  ) {
    const previousConfig = await this.getConfig().catch(() => null);

    const name = settings.name;
    const projectKey = crypto.sha256(name);
    let fileToSync = "README.md";
    let heading = "Task List";

    //should be relative in case of developer developing in different environment.
    const dir = "./";

    if (previousConfig) {
      console.warn(
        `${chalk.yellow(
          "Seems you are trying to overwrite config file which might lead to unexpected behavior.\nWish you know what you are doing."
        )}`
      );
    }

    // no recursive.
    const dirs = fsSync.readdirSync(dir, { withFileTypes: true });

    const files = dirs
      .filter((dir) => dir.isFile())
      .map((dirent) => {
        return {
          key: dirent.name,
          name: dirent.name,
          value: dirent.name,
        };
      });

    fileToSync = await input.select(
      "Select File where to Record(Sync): ",
      files,
      ["key", "name", "value"]
    );
    heading = await input.enterText("Enter heading of task list: ", heading);

    const config = {
      project: {
        key: projectKey,
        name,
        sync: fileToSync,
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

    if (!historyCollection[project.key]) {
      historyCollection[project.key] = {};
    }

    historyCollection[project.key][taskKey] = value;
    return fs.writeFile(this.historyPath, stringify(historyCollection));
  }

  async deleteHistory(taskKey) {
    const fileContent = await fs
      .readFile(this.historyPath, "utf8")
      .catch((e) => "");

    const historyCollection = parse(fileContent) ?? {};
    const { project } = await this.getConfig();

    if (!historyCollection[project.key]) {
      historyCollection[project.key] = {};
    }

    if (historyCollection[project.key][taskKey]) {
      delete historyCollection[project.key][taskKey];
    }
    return fs.writeFile(this.historyPath, stringify(historyCollection));
  }

  async overwriteHistroy(value) {
    const fileContent = await fs
      .readFile(this.historyPath, "utf8")
      .catch((e) => "");

    const historyCollection = parse(fileContent) ?? {};
    const { project } = await this.getConfig();

    if (!historyCollection[project.key]) {
      historyCollection[project.key] = {};
    }

    historyCollection[project.key] = value;
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
    const history = await this.#getEntireHistory();
    if (history !== null) {
      console.warn("Current history file exist:", history);
      const overwrite = await input.confirm(
        `${chalk.red(
          "History won't be able to recover after overwrite."
        )} Continue?`,
        this.historyPath
      );
      if (!overwrite) {
        return;
      }
    }

    await fs.writeFile(this.historyPath, "");
    console.log(`History file created to ${this.historyPath}`);
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
