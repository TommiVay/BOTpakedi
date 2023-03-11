import { IS_IT_FRIDAY_MATCHER, isItFirdayHandler } from "./commands/isItFriday";
import { ASK_AI_MATCHER, askAIHandler } from "./commands/askAI";
import { SOURCE_CODE_MATCHER, sourceCodeHandler } from "./commands/sourceCode";
import * as config from "./utils/config";
import axios from "axios";

const baseURI = `https://discord.com/api/v10/webhooks/${process.env.APP_ID}`;
const headers = {
  Authorization: `Bot ${config.BOT_TOKEN}`,
  "Content-Type": "application/json",
};

const sendAnswer = async (answer: Object, interactionToken: string) => {
  try {
    await axios.patch(
      `${baseURI}/${interactionToken}/messages/@original`,
      answer,
      {
        headers: headers,
      }
    );
  } catch (error) {
    console.log("SEND ASWER ERROR");
    console.log(error);
  }
};

exports.handler = async (event: any) => {
  const eventMessage = JSON.parse(event.Records[0].Sns.Message);
  const interactionToken = eventMessage.token;
  let answer: Object;

  switch (eventMessage.data.name) {
    case IS_IT_FRIDAY_MATCHER:
      answer = isItFirdayHandler();
      break;
    case ASK_AI_MATCHER:
      answer = await askAIHandler(eventMessage.data.options[0]?.value);
      break;
    case SOURCE_CODE_MATCHER:
      answer = sourceCodeHandler();
      break;
    default:
      answer = { content: "Command not found" };
  }

  await sendAnswer(answer, interactionToken);
};
