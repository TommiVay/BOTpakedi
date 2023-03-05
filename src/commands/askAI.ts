const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const model = "gpt-3.5-turbo";
const ERROR = "something went wrong";

const askAIHandler = async (question: string): Promise<Object> => {
  console.log("/ask");
  if (!question) return ERROR;
  try {
    const completion = await openai.createChatCompletion({
      model: model,
      messages: [{ role: "user", content: question }],
    });
    return formatAnswer(question, completion.data.choices[0].message.content);
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return ERROR;
  }
};

const formatAnswer = (question: string, answer: string): Object => {
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

export default askAIHandler;
