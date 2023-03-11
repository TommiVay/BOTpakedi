const { Configuration, OpenAIApi } = require("openai");
import * as config from "../utils/config";

const ASK_AI_MATCHER = "ask";

const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const model = "gpt-3.5-turbo";

const askAIHandler = async (question: string): Promise<string> => {
  if (!question) return "No question received";
  try {
    const completion = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "user", content: question }],
    });
    const formattedAnswer = formatAnswer(
      question,
      completion.data.choices[0].message.content
    );
    return JSON.stringify(formattedAnswer);
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
  return "Something went wrong...";
};

const formatAnswer = (question: string, answer: string): Object => {
  console.log("Q: " + question);
  console.log("A: " + answer);
  return {
    content: "",
    tts: false,
    embeds: [
      {
        type: "rich",
        title: question,
        description: "",
        color: 0x9f9f9f,
        fields: [
          {
            name: "\u200B",
            value: "```" + answer + "```",
          },
        ],
      },
    ],
  };
};

export { ASK_AI_MATCHER, askAIHandler };
