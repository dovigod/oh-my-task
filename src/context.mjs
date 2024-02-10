import { Manifest } from "./manifest.mjs";
import os from "os";

const DefaultHistoryPath = `${os.homedir()}/.omt/history.yaml`;
// const userConfigPath = `${os.homedir()}/.omt/userConfig.yaml`;
const configPath = `${process.cwd()}/.omt.yaml`;

export const manifest = new Manifest(
  configPath,
  DefaultHistoryPath
  // userConfigPath
);
