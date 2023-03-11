import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import nacl from "tweetnacl";
import { Request, Response } from "express";
import * as config from "./utils/config";
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const snsClient = new SNSClient({ region: config.REGION });

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

  // Replying to discord ping
  if (body.type === 1) {
    console.log("REPlY PING");
    return res.status(200).json({ type: 1 });
  }

  const params = {
    TopicArn: config.SNS_EVENT_ARN,
    Message: JSON.stringify(body),
  };

  try {
    await snsClient.send(new PublishCommand(params));
    res.status(200).json({
      type: 4,
      data: { content: "Processing..." },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      type: 4,
      data: { content: "Something went wrong..." },
    });
  }
});

app.use((req: Request, res: Response) => {
  console.log("NOT FOUND");
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
