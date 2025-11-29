import { bot } from "../index.js";
import User from "./models/User.js";


async function onStart(chatId, firstName) {
  console.log("onStart...!", chatId);

  const userExists = await User.findOne({ telegramId: chatId });

  console.log(!userExists);

  if (!userExists) {

    const newUser = new User({
      telegramId: chatId,
      firstname: firstName,
    });

    newUser.save();
  }

  bot.sendMessage(
    chatId,)}
    