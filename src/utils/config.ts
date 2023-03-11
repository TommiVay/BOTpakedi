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

export const BOT_PUBLIC_KEY: string = extractStringEnvVar("BOT_PUBLIC_KEY");
export const OPENAI_API_KEY: string = extractStringEnvVar("OPENAI_API_KEY");
export const APP_ID: string = extractStringEnvVar("APP_ID");
export const BOT_TOKEN: string = extractStringEnvVar("BOT_TOKEN");
export const REGION: string = extractStringEnvVar("REGION");
export const SNS_EVENT_ARN: string = extractStringEnvVar("SNS_EVENT_ARN");
