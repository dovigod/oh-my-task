import crypto from "node:crypto";
export function sha256(message) {
  return crypto.createHash("sha256").update(message).digest("hex");
}
