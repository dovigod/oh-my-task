import { Config } from "./config.mjs";

const configPath = `${process.cwd()}/.ohmycli.yaml`;

export const config = new Config(configPath);
