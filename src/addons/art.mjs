import chalk from "chalk";

export function printASCIIArt() {
  console.log(`
  ${chalk.redBright(` ██████  ██   ██`)}     ${chalk.greenBright(
    `███    ███ ██    ██`
  )}     ${chalk.blueBright(`████████  █████  ███████ ██   ██`)}   ${chalk.cyan(
    `██`
  )}\n
  ${chalk.redBright(`██    ██ ██   ██`)}     ${chalk.greenBright(
    `████  ████  ██  ██`
  )}      ${chalk.blueBright(
    `   ██    ██   ██ ██      ██  ██`
  )}    ${chalk.cyan(`██`)}\n
  ${chalk.redBright(`██    ██ ███████`)}     ${chalk.greenBright(
    `██ ████ ██   ████`
  )}       ${chalk.blueBright(
    `   ██    ███████ ███████ █████`
  )}     ${chalk.cyan(`██`)}\n
  ${chalk.redBright(`██    ██ ██   ██`)}     ${chalk.greenBright(
    `██  ██  ██    ██`
  )}        ${chalk.blueBright(
    `   ██    ██   ██      ██ ██  ██`
  )}    ${chalk.cyan(``)}\n
  ${chalk.redBright(` ██████  ██   ██`)}     ${chalk.greenBright(
    `██      ██    ██`
  )}        ${chalk.blueBright(
    `   ██    ██   ██ ███████ ██   ██`
  )}   ${chalk.cyan(`██`)}\n`);

  return;
}
