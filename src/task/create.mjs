import chalk from "chalk";
import * as context from "../context.mjs";
import * as input from "../cli-input.mjs";
import { Task } from "./Task.mjs";

export async function create() {
  const config = await context.config.getConfig();

  if (config === null) {
    throw new Error("No config found");
  }

  // title is Required
  const title = await input.requiredText(
    `${chalk.blueBright("(Required)")} Enter Title of Task : `,
    ""
  );

  //description is Optional
  let description = "";
  const needDescription = await input.confirm(`Need Description? : `, true);
  if (needDescription) {
    description = await input.enterText(`Enter Description : `, "");
  }

  const task = new Task(title, description);

  //@TODO need global file to distinguish each project
  // await context.config.
  // await factory.config.setHistoryConfig("lastCreatedTicketKey", issue.key);

  // return issue.key;
}
