import DiscordJS from "discord.js";

const isItFirdayHandler = (msg: DiscordJS.Message<boolean>): void => {
  const date = new Date();
  let reply = "No";
  if (date.getDay() === 5) {
    reply = "Yes";
  }
  msg.reply({
    content: reply,
  });
};

export default isItFirdayHandler;
