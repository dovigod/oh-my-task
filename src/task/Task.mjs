import { TASK_STATUS } from "../status.mjs";
import * as crypto from "../utils/crypto.mjs";
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
