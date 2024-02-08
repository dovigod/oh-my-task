import { TASK_STATUS } from "../status.mjs";
import * as crypto from "../utils/crypto.mjs";
export class Task {
  // state :: IDLE IN-PROGRESS COMPLETE
  key;
  #status;
  title;
  description;

  constructor(title, description) {
    this.key = crypto.sha256(`task::${title}-${description}`);
    this.title = title;
    this.description = description;
    this.#status = TASK_STATUS.IDLE;
  }
  getProgress() {
    return this.#status;
  }

  setProgress(state) {
    return (this.#status = state);
  }

  objectify() {
    return {
      title: this.title,
      description: this.description,
      status: this.#status,
    };
  }
}
