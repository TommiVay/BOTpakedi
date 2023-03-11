import serverless from "serverless-http";
import express from "express";
import bodyParser from "body-parser";
import nacl from "tweetnacl";
import { Request, Response } from "express";
import { IS_IT_FRIDAY_MATCHER, isItFirdayHandler } from "./commands/isItFriday";
import { ASK_AI_MATCHER, askAIHandler } from "./commands/askAI";
import * as config from "./utils/config";

exports.handler = async (event: any) => {
  console.log(JSON.stringify(event));
  /* 
  // Handle /isitfriday
  if (body.data.name === IS_IT_FRIDAY_MATCHER) {
    return res.status(200).json({
      type: 4,
      data: { content: isItFirdayHandler() },
    });
  }

  // Handle /ask
  if (body.data.name === ASK_AI_MATCHER) {
    console.log(body);
    res.status(200).json({
      type: 4,
      data: { content: "Processing..." },
    });
    await askAIHandler(body.data.options[0]?.value, body.token);
    console.log("AFTER ASK AI HANDLER")
    return;
  }

  console.log("CMD NOT FOUND");
  return res.status(404).json({
    error: "Not Found",
  }); */
};
