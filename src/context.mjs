import { Manifest } from "./manifest.mjs";
import os from "os";

const DefaultHistoryPath = `${os.homedir()}/.omc/history.yaml`;
const configPath = `${process.cwd()}/.omc.yaml`;

export const manifest = new Manifest(configPath, DefaultHistoryPath);
