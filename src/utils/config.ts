import dotenv from "dotenv";
dotenv.config();

const extractStringEnvVar = (key: keyof NodeJS.ProcessEnv): string => {
  const value = process.env[key];
  if (value === undefined) {
    const message = `The environment variable "${key}" cannot be "undefined".`;
    throw new Error(message);
  }
  return value;
};

export const MONGODB_URI: string = extractStringEnvVar("MONGODB_URI");
export const TOKEN: string = extractStringEnvVar("TOKEN");
