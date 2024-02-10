import * as inquirer from "@inquirer/prompts";

export async function enterText(message, defaultValue, validate = undefined) {
  return inquirer.input({
    default: defaultValue,
    message,
    validate,
  });
}

export async function requiredText(message, defaultValue) {
  return enterText(message, defaultValue, (input) => {
    return input.trim().length !== 0
      ? true
      : "input should be longer than 0 character";
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

// export async function token(message) {
//   return inquirer.password({
//     message,
//   });
// }
