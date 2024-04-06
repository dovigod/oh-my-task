import * as context from "../context.mjs";
import { TASK_STATUS, TASK_STATUS_TEXT } from "../status.mjs";
import * as input from "../input.mjs";
import chalk from "chalk";

export async function clean(
  cleanOptions = {
    selection: true,
    complete: false,
    idle: false,
  }
) {
  let taskCollection = await context.manifest.getHistory();

  if (cleanOptions.selection) {
    const taskList = Object.keys(taskCollection).map((taskKey) => {
      return {
        name: taskCollection[taskKey].title,
        value: taskKey,
      };
    });

    const selectedTask = await input.select("Select Task to clean:", taskList, [
      "name",
    ]);
    const taskTitle = taskCollection[selectedTask].title;

    await context.manifest.deleteHistory(selectedTask);

    console.log(
      `Successfully cleaned task:: ${chalk.gray(taskTitle)}(${chalk.greenBright(
        selectedTask
      )})`
    );
    return;
  }

  if (cleanOptions.complete) {
    const cleanResult = await batchClean(taskCollection, TASK_STATUS.COMPLETE);

    if (cleanResult.success) {
      console.log(
        `Total ${chalk.greenBright(
          cleanResult.total
        )} task with status ${chalk.bgBlueBright(
          TASK_STATUS_TEXT[TASK_STATUS.COMPLETE]
        )} has been deleted`
      );
    } else {
      throw new Error("Error occured while running batch clean");
    }
  }

  if (cleanOptions.idle) {
    const cleanResult = await batchClean(taskCollection, TASK_STATUS.IDLE);

    if (cleanResult.success) {
      console.log(
        `Total ${chalk.greenBright(
          cleanResult.total
        )} task with status ${chalk.bgBlueBright(
          TASK_STATUS_TEXT[TASK_STATUS.IDLE]
        )} has been deleted`
      );
    } else {
      throw new Error("Error occured while running batch clean");
    }
  }
}

async function batchClean(taskCollection, statusType) {
  const reciept = {
    success: true,
    total: 0,
    status: statusType,
  };

  const updatedTaskCollection = { ...taskCollection };

  const targets = Object.keys(updatedTaskCollection).filter(
    (taskKey) => updatedTaskCollection[taskKey].status === statusType
  );
  console.log(targets, updatedTaskCollection);

  reciept.total = targets.length;

  targets.forEach((target) => {
    delete updatedTaskCollection[target];
  });

  await context.manifest.overwriteHistroy(updatedTaskCollection);
  reciept.success = true;

  return reciept;
}
