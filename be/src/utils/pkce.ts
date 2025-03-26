import crypto from "crypto";

export const generatePKCE = () => {
  const codeVerifier = crypto.randomBytes(64)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 128);

  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return { codeVerifier, codeChallenge };
};