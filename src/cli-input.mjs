import * as inquirer from "@inquirer/prompts";

export async function enterText(message, defaultValue) {
  return inquirer.input({
    default: defaultValue,
    message,
  });
}

export async function confirm(message, defaultValue = true) {
  return inquirer.confirm({
    default: defaultValue,
    message,
  });
}
