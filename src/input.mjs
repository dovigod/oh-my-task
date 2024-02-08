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

export async function select(message, choices, defaultValue = "123") {
  return inquirer.select({
    message,
    choices,
    loop: false,
    default: defaultValue,
  });
}
