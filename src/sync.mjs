import chalk from "chalk";
import * as context from "./context.mjs";
import * as input from "./input.mjs";
import * as markdown from "./markdown.mjs";
import { Formatter } from "./formatter.mjs";

export async function sync() {
  const config = await context.manifest.getConfig();

  if (config === null) {
    throw new Error("No config found for current project");
  }

  const histories = await context.manifest.getHistory();

  if (!histories) {
    throw new Error("No history found for current project");
  }

  const syncTo = config.project.sync;
  const heading = config.project.heading;
  const taskList = Object.values(histories).map((history) => {
    return {
      title: history.title,
      description: history.description,
      status: history.status,
    };
  });

  const syncToFileType = getFileType(syncTo);

  const formatter = new Formatter(syncToFileType, heading, taskList);
  const formattedStringToInject = formatter.run();

  console.log(formattedStringToInject);
}

function getFileType(file) {
  if (markdown.isMarkdown(file)) {
    return "md";
  } else {
    return "plain";
  }
}
