// index.js
const TelegramBot = require("node-telegram-bot-api");

// Tokenni shu yerga yozing
const TOKEN = "8420582819:AAHr1VoKfsDgCuPDPW51jnloTNS5WEIlZ08";

// Botni ishga tushiramiz (polling rejimida)
const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🤖 Bot ishga tushdi...");

// /start komandasi uchun handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.chat.first_name || "Foydalanuvchi";

  const welcomeText = `
👋 Assalomu alaykum, ${firstName}!

📚 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma’lumot olasiz  
• Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin  
• Jadval va to‘lovlar haqida bilib olasiz  

👇 Quyidagi menyudan kerakli bo‘limni tanlang:
`;

  bot.sendMessage(chatId, welcomeText, {
    reply_markup: {
      keyboard: [
        [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
        [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
        [{ text: "❓ Yordam" }],
      ],
      resize_keyboard: true,
    },
  });
});

// Oddiy xabarlar uchun handler
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  switch (text) {
    case "📚 Kurslar":
      bot.sendMessage(
        chatId,
        `🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:

1️⃣ Ingliz tili  
2️⃣ Rus tili  
3️⃣ Matematika  
4️⃣ Dasturlash (Python, Web)  
5️⃣ Grafik dizayn  

👇 Kursni tanlang, batafsil ma’lumot beraman:
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

    case "ℹ️ Markaz haqida":
      bot.sendMessage(
        chatId,
        `🏫 *100x Academy* — bu zamonaviy ta'lim markazi bo‘lib,
talabalarga til o‘rganish, dasturlash va dizayn sohalarida
yuqori sifatli ta'lim beradi.

📍 Manzil: Urganch shahri, Al-Xorazmiy ko‘chasi 45-uy  
📞 Telefon: +998 90 123 45 67  
🌐 Instagram: @100x_academy
        `,
        { parse_mode: "Markdown" }
      );
      break;

    case "✍️ Ro‘yxatdan o‘tish":
      bot.sendMessage(
        chatId,
        `✍️ Ro‘yxatdan o‘tish uchun quyidagi havola orqali ariza topshiring:
👉 [Ro‘yxatdan o‘tish shakli](https://forms.gle/example)

Yoki admin bilan bog‘laning: @Admin100x`,
        { parse_mode: "Markdown" }
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
        `🆘 Yordam uchun quyidagi manzil orqali bog‘laning:
📞 +998 90 123 45 67  
📩 @Admin100x`
      );
      break;

    default:
      if (!text.startsWith("/")) {
        bot.sendMessage(
          chatId,
          `⚠️ Kechirasiz, bu buyruqni tushunmadim.\n/start buyrug‘ini bosing va menyudan tanlang.`
        );
      }
      break;
  }
});

// Inline tugmalar uchun callback handler
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  const courseInfo = {
    english: "🇬🇧 *Ingliz tili kursi*\n\n📆 Muddat: 3 oy\n💰 Narx: 350.000 so‘m/oy\n👨‍🏫 Daraja: Beginner — Advanced\n🕒 Darslar: Dushanba, Chorshanba, Juma",
    russian: "🇷🇺 *Rus tili kursi*\n\n📆 Muddat: 3 oy\n💰 Narx: 350.000 so‘m/oy\n🕒 Darslar: Seshanba, Payshanba, Shanba",
    math: "🧮 *Matematika kursi*\n\n📆 Muddat: 4 oy\n💰 Narx: 400.000 so‘m/oy\n🎯 Maqsad: Maktab va abituriyentlar uchun",
    it: "💻 *Dasturlash kursi (Python, Web)*\n\n📆 Muddat: 6 oy\n💰 Narx: 500.000 so‘m/oy\n🔧 Yo‘nalishlar: Frontend, Backend, Python",
    design: "🎨 *Grafik dizayn kursi*\n\n📆 Muddat: 5 oy\n💰 Narx: 450.000 so‘m/oy\n📚 Dasturlar: Photoshop, Illustrator, Figma",
  };

  const info = courseInfo[data] || "Kurs haqida ma’lumot topilmadi.";
  bot.sendMessage(chatId, info, { parse_mode: "Markdown" });
});

