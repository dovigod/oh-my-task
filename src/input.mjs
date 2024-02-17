import * as inquirer from "@inquirer/prompts";
import Fuse from "fuse.js";
import autocomplete from "inquirer-autocomplete-standalone";

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

/**
 *
 * @param {string} message
 * @param {T[]} choices - in case of using normal inquirer selection, should be form of { value : string , name : string }[]
 * @param {string[]} searchKeys  - list of key of element of choices
 * @returns
 */
export async function select(message, choices, searchKeys) {
  if (searchKeys) {
    const fuse = new Fuse(choices, { keys: searchKeys });

    return await autocomplete({
      message,
      source: async (input) => {
        if (input === undefined || input.trim() === "") {
          return choices;
        }

        const searchedList = fuse.search(input);
        return searchedList.map((searched) => ({
          value: searched.item.value,
          name: searched.item.name,
        }));
      },
    });
  } else {
    return inquirer.select({
      message,
      choices,
      loop: false,
    });
  }
}
