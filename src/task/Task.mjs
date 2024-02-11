import { TASK_STATUS, TASK_STATUS_TEXT } from "../status.mjs";
import * as crypto from "../utils/crypto.mjs";
import chalk from "chalk";
export class Task {
  // state :: IDLE IN-PROGRESS COMPLETE
  key;
  #status;
  title;
  description;
  baseBranch;

  // inverse of objectify
  static build(taskObj) {
    return new Task(
      taskObj.title,
      taskObj.description,
      taskObj.baseBranch,
      taskObj.status
    );
  }

  constructor(title, description, baseBranch, state = TASK_STATUS.IDLE) {
    this.key = crypto.sha256(`task::${title}-${description}`);
    this.title = title;
    this.description = description;
    this.#status = state;
    this.baseBranch = baseBranch;
  }
  getProgress() {
    return this.#status;
  }

  setProgress(state) {
    return (this.#status = state);
  }

  select(state) {
    const previousStateText = TASK_STATUS_TEXT[this.getProgress()];
    const currentStateText = TASK_STATUS_TEXT[state];

    console.log(`switching to Task ${this.key}..`);

    this.setProgress(state);

    console.log(
      `Task ${chalk.blueBright(this.key)} progress change ${chalk.gray(
        previousStateText
      )} -> ${chalk.green(currentStateText)} complete`
    );
  }

  // inverse of build
  objectify() {
    return {
      title: this.title,
      description: this.description,
      status: this.#status,
      baseBranch: this.baseBranch,
    };
  }
}
