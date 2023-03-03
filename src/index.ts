const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nacl = require("tweetnacl");

//import DiscordJS, { Intents } from "discord.js";
//import mongoose from "mongoose";
import * as config from "./utils/config";
import { Request, Response } from "express";

app.use(bodyParser.json());

app.post("/botpakedi", (req: Request, res: Response) => {
  console.log("/botpakedi");
  console.log(req);
  // Checking signature (requirement 1.)
  // Your public key can be found on your application in the Developer Portal
  const signature = req.get("x-signature-ed25519");
  const timestamp = req.get("x-signature-timestamp");
  const body = req.body;

  if (!signature || !timestamp || !body) {
    return res.status(400);
  }

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + JSON.stringify(body)),
    Buffer.from(signature, "hex"),
    Buffer.from(config.BOT_PUBLIC_KEY, "hex")
  );

  if (!isVerified) {
    console.log("NOT VERIFIED");
    return res.status(401).end("invalid request signature");
  }

  // Replying to ping
  if (body.type == 1) {
    console.log("REPlY PING");
    return res.status(200).json({ type: 1 });
  }

  return res.status(404).json({
    error: "Not Found",
  });
});

app.use((req: Request, res: Response) => {
  console.log("NOT FOUND");
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
