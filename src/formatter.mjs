import * as markdown from "./markdown.mjs";
import { TASK_STATUS } from "./status.mjs";

/**
 * transform heading and taskList to appropriate format (currently supporting markdown only.)
 * result of `run` should be ready-to-go for supporting file format.
 *
 */
export class Formatter {
  fileType;
  heading;
  taskList;

  constructor(fileType, heading, taskList) {
    this.fileType = fileType;
    this.heading = heading;
    this.taskList = taskList;
  }

  _toPlainText() {
    let formattedPT = ``;
    let tasksPT = ``;

    //format title
    this.taskList.forEach((task) => {
      let taskPT = ``;

      if (task.status) {
        taskPT = `\n - ${markdown.emoji[task.status]} - ${task.title}`;
      } else {
        // Invalid Task detected. gracefully shutdown.
        console.error("Invalid Task detected");
        taskPT = `\n - ? - ${task.title}`;
      }

      // format description
      if (task.description) {
        taskPT += `\n   :: ${task.description}`;
      }

      taskPT += "\n";

      tasksPT += taskPT;
    });

    formattedPT = `${this.heading}
    ${tasksPT}
    `;

    return formattedPT;
  }
  _toMarkdown() {
    let formattedMd = "";
    let tasksMd = "";
    const titleMd = markdown.format(this.heading, "h2");

    this.taskList.forEach((task) => {
      let taskMd = task.title;
      // format title
      switch (task.status) {
        case TASK_STATUS.IDLE: {
          taskMd = markdown.pipe(taskMd, [TASK_STATUS.IDLE, "ul", "br"]);
          break;
        }
        case TASK_STATUS.WORKING: {
          taskMd = markdown.pipe(taskMd, [
            "u",
            "b",
            TASK_STATUS.WORKING,
            "ul",
            "br",
          ]);
          break;
        }
        case TASK_STATUS.COMPLETE: {
          taskMd = markdown.pipe(taskMd, [
            "s",
            TASK_STATUS.COMPLETE,
            "ul",
            "br",
          ]);
          break;
        }
        // Invalid Task detected. gracefully shutdown.
        default: {
          console.error("Invalid Task detected");
          taskMd = markdown.pipe(taskMd, ["ul", "br"]);
          break;
        }
      }
      // format description
      if (task.description) {
        taskMd += markdown.format(task.description, "blockquote");
      }

      tasksMd += `\n\n${taskMd}`;
    });

    formattedMd = titleMd + tasksMd;

    return formattedMd;
  }

  run() {
    switch (this.fileType) {
      case "md": {
        return this._toMarkdown();
      }
      default: {
        return this._toPlainText();
      }
    }
  }
}
