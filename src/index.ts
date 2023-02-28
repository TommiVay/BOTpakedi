const serverless = require("serverless-http");
const express = require("express");
const app = express();

import DiscordJS, { Intents } from "discord.js";
//import mongoose from "mongoose";
import * as config from "./utils/config";
import * as constants from "./utils/constants";
import isItFridayHandler from "./commands/isItFriday";
import wheelchairHandler from "./commands/wheelchair";
import { Response } from "express";

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
/* 
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  }); */

/* client.on("ready", (): void => {
  console.log("Bot ready");
});

client.on("messageCreate", (msg: DiscordJS.Message<boolean>): void => {
  const command = msg.content.toLowerCase();
  // is it friday
  if (constants.IS_IT_FRIDAY_MATCHERS.includes(command)) {
    isItFridayHandler(msg);
    return;
  }

  // wheelchair
  if (command.startsWith(constants.WHEELCHAIR_PREFIX)) {
    console.log("!wheelchair");
    wheelchairHandler(command);
  }
});

client.login(config.TOKEN); */

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
