import { onStart } from "./src/onStart.js";
// import { onCourses } from "./src/onCourses.js";
import mongoose from "mongoose";
import User from "./src/models/User.js";
import onUsers from "./src/onUsers.js";
import { config } from "dotenv";



config();




bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "📚 Kurslar") {
    onCourses(chatId);
  } else if (text === "✍️ Ro‘yxatdan o‘tish") {
    onRegister(chatId);
  } else if (text === "/users") {
    onUsers(chatId);
  } else {
    onElse(chatId);
  }
});

export { bot }