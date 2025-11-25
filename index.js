const TelegramBot = require("node-telegram-bot-api");
const { config } = require("dotenv");
const { default: mongoose } = require("mongoose");
config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
  console.log("db is connected...");
  
})
.catch(() => {
  console.log(`Error: db is not connected...!`);
  
})

console.log("🤖 Bot ishga tushdi...");


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.chat.first_name || "Foydalanuvchi";

  const welcomeText = `
👋 Assalomu alaykum, <b>${firstName}</b>!

📚 <b>100x Academy</b> o'quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma'lumot olasiz  
• Kurslarga onlayn ro'yxatdan o'tishingiz mumkin  
• Jadval va to'lovlar haqida bilib olasiz  

👇 Quyidagi menyudan kerakli bo'limni tanlang:
`;

  bot.sendMessage(chatId, welcomeText, {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [{ text: "📚 Kurslar" }, { text: "✍️ Ro'yxatdan o'tish" }],
        [{ text: " Markaz haqida" }, { text: "💬 Fikr bildirish" }],
        [{ text: "❓ Yordam" }],
      ],
      resize_keyboard: true,
    },
  });
});




bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  switch (text) {
    case "📚 Kurslar":
      bot.sendMessage(
        chatId,
        `🎓 Bizning o'quv markazimizda quyidagi kurslar mavjud:

1️⃣ Ingliz tili  
2️⃣ Rus tili  
3️⃣ Matematika  
4️⃣ Dasturlash (Python, Web)  
5️⃣ Grafik dizayn  

👇 Kursni tanlang, batafsil ma'lumot beraman:
        `,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "🇬🇧 Ingliz tili", callback_data: "english" }],
              [{ text: "🇷🇺 Rus tili", callback_data: "russian" }],
              [{ text: "🧮 Matematika", callback_data: "math" }],
              [{ text: "💻 Dasturlash", callback_data: "it" }],
              [{ text: "🎨 Grafik dizayn", callback_data: "design" }],
            ],
          },
        }
      );
      break;

    case "i Markaz haqida":
      bot.sendMessage(
        chatId,
        `
🏫 <b>100x Academy</b> — bu zamonaviy ta'lim markazi bo'lib,
talabalarga til o'rganish, dasturlash va dizayn yo'nalishlarida
yuqori sifatli ta'lim beradi.

📍 <b>Manzil:</b> Urganch shahri, Al-Xorazmiy ko'chasi 45-uy  
📞 <b>Telefon:</b> +998 90 123 45 67  
🌐 <b>Instagram:</b> @100x_academy
        `,
        { parse_mode: "HTML" }
      );
      break;

    case "✍️ Ro'yxatdan o'tish":
      bot.sendMessage(
        chatId,
        `
✍️ Ro'yxatdan o'tish uchun quyidagi havolani bosing:

👉 <a href="https://forms.gle/example">Ro'yxatdan o'tish shakli</a>

Yoki admin bilan bog'laning: @Admin100x
        `,
        { parse_mode: "HTML" }
      );
      break;

    case "💬 Fikr bildirish":
      bot.sendMessage(
        chatId,
        `💬 Sizning fikringiz biz uchun muhim!

Iltimos, bu yerda markazimiz haqidagi fikr va takliflaringizni yozib qoldiring.`
      );
      break;

    case "❓ Yordam":
      bot.sendMessage(
        chatId,
        `
🆘 <b>Yordam uchun bog'lanish:</b>

📞 +998 90 123 45 67  
📩 @Admin100x
        `,
        { parse_mode: "HTML" }
      );
      break;

    default:
      if (!text.startsWith("/")) {
        bot.sendMessage(
          chatId,
          `⚠️ Kechirasiz, bu buyruqni tushunmadim.\n/start buyrug'ini bosing va menyudan tanlang.`
        );
      }
      break;
  }
});




bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  const courseInfo = {
    english: `
🇬🇧 <b>Ingliz tili kursi</b>

📆 <b>Muddat:</b> 3 oy  
💰 <b>Narx:</b> 350.000 so'm/oy  
👨‍🏫 <b>Daraja:</b> Beginner — Advanced  
🕒 <b>Darslar:</b> Dushanba, Chorshanba, Juma
`,

    russian: `
🇷🇺 <b>Rus tili kursi</b>

📆 <b>Muddat:</b> 3 oy  
💰 <b>Narx:</b> 350.000 so'm/oy  
🕒 <b>Darslar:</b> Seshanba, Payshanba, Shanba
`,

    math: `
🧮 <b>Matematika kursi</b>

📆 <b>Muddat:</b> 4 oy  
💰 <b>Narx:</b> 400.000 so'm/oy  
🎯 <b>Maqsad:</b> Maktab o'quvchilari va abituriyentlar uchun
`,

    it: `
💻 <b>Dasturlash kursi</b>

📆 <b>Muddat:</b> 6 oy  
💰 <b>Narx:</b> 500.000 so'm/oy  
🔧 <b>Yo'nalishlar:</b> Frontend, Backend, Python
`,

    design: `
🎨 <b>Grafik dizayn kursi</b>

📆 <b>Muddat:</b> 5 oy  
💰 <b>Narx:</b> 450.000 so'm/oy  
📚 <b>Dasturlar:</b> Photoshop, Illustrator, Figma
`,
  };

  const info = courseInfo[data] || "Kurs haqida ma'lumot topilmadi.";

  bot.sendMessage(chatId, info, { parse_mode: "HTML" });
});

