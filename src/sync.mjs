import chalk from "chalk";
import * as context from "./context.mjs";
import * as markdown from "./markdown.mjs";
import { Formatter } from "./formatter.mjs";
import fs from "fs/promises";

const PLACEHOLDER_START = "<!-->Start of Placeholder of OH-MY-TASK<-->";
const PLACEHOLDER_END = "<!-->End of Placeholder of OH-MY-TASK<-->";

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

  const syncToFileType = getSyncFileType(syncTo);

  const formatter = new Formatter(syncToFileType, heading, taskList);
  const formattedStringToInject = formatter.run();

  await inject(syncTo, formattedStringToInject);
  console.log(chalk.green(`Tasks Successfully synchronized to ${syncTo}`));
}

/**
 * injects `content` inside `PLACEHOLDER_START` & PLACEHOLDER_END`
 *
 * @param {string} filepath - file path where to sync tasks
 * @param {string} content - string content which is obtained by `Formatter.run()`
 */
async function inject(filepath, content) {
  const fileContent = await fs.readFile(filepath, { encoding: "utf-8" });

  // discard file content inside placeholder  (if previous content exists)
  const regex = new RegExp(
    `(${PLACEHOLDER_START}).*?(${PLACEHOLDER_END})`,
    "gs"
  );

  let updatedContent = fileContent.replace(regex, "$1$2");

  // inject
  const placeholderExist =
    updatedContent.includes(PLACEHOLDER_START) &&
    updatedContent.includes(PLACEHOLDER_END);

  // inject - general case
  if (placeholderExist) {
    updatedContent = updatedContent.replace(
      PLACEHOLDER_START,
      `${PLACEHOLDER_START}\n${content}`
    );
  } else {
    // no placeholder
    updatedContent += `${PLACEHOLDER_START}\n${content}\n${PLACEHOLDER_END}`;
  }

  await fs.writeFile(filepath, updatedContent).catch(console.error);
}

function getSyncFileType(file) {
  if (markdown.isMarkdown(file)) {
    return "md";
  } else {
    return "plain";
  }
}
