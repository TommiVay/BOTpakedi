import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import nacl from "tweetnacl";
import { Request, Response } from "express";
import isItFirdayHandler from "./commands/isItFriday";
import askAIHandler from "./commands/askAI";
import * as config from "./utils/config";
import * as constants from "./utils/constants";

const app = express();
app.use(bodyParser.json());

app.post("/botpakedi", async (req: Request, res: Response) => {
  console.log("/botpakedi");

  // Checking signature
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
  if (body.type === 1) {
    console.log("REPlY PING");
    return res.status(200).json({ type: 1 });
  }

  // Handle /isitfriday
  if (body.data.name === constants.IS_IT_FRIDAY) {
    return res.status(200).json({
      type: 4,
      data: { content: isItFirdayHandler() },
    });
  }

  // Handle /ask
  if (body.data.name === constants.ASK) {
    console.log(body.data);

    const answer = await askAIHandler(body.data.options[0]?.value);
    return res.status(200).json({
      type: 4,
      data: answer,
    });
  }

  console.log("CMD NOT FOUND");
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
