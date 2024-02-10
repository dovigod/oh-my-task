import * as context from "../context.mjs";
import { TASK_STATUS } from "../status.mjs";
import chalk from "chalk";
import { emoji } from "../markdown.mjs";

export async function list(
  options = {
    all: false,
  }
) {
  const historyCollection = await context.manifest.getHistory();

  Object.values(historyCollection).forEach((history) => {
    let message = chalk.yellow(history.title);

    if (history.description) {
      message += ` - ${history.description}`;
    }

    if (options.all) {
      message = `${emoji[history.status]} ` + message;
    }

    if (history.status !== TASK_STATUS.COMPLETE || options.all) {
      console.log(message);
    }
  });
}
