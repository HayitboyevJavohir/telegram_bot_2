import { bot } from "../index.js";

function onRegister(chatId) {
  console.log("onRegister...!");
//   const userExists = usersData.some((user) => user.chatId === chatId);
//   console.log("bormi: ", userExists);

//   if (!userExists) {
//     usersData.push({ chatId: chatId, firstName: firstName, admin: false });
//     // usersData = [...usersData, { chatId: chatId, firstName: firstName }];
//   }

//   console.log(usersData);
  // Foydalanuvchiga xabar jo'natish
  bot.sendMessage(chatId, `Tabriklaymiz, siz ro'yhatdan o'tdingiz! ✅`);

  // Adminga xabar jo'natish
//   usersData.forEach((user) => {
//     // console.log("USER: ", user.admin);
//     if (user.admin) {
//       bot.sendMessage(
//         user.chatId,
//         `Yangi xabar ✅\nUser: ${firstName}\nchatId: ${chatId}\n**************`
//       );
//     }
//   });
}

export { onRegister };