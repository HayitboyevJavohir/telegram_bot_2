
const TelegramBot = require("node-telegram-bot-api");


const TOKEN = "8360898013:AAEgGc_EuLo-PDdXbrOXvUa-Ue4wSG5DnpY";


const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🤖 Bot ishga tushdi...");


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.chat.first_name || "Foydalanuvchi";

  const welcomeText = `
👋 Assalomu alaykum, ${firstName}!

📚 100x Academy oquv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil malumot olasiz  
• Kurslarga onlayn royxatdan otishingiz mumkin  
• Jadval va tolovlar haqida bilib olasiz  

👇 Quyidagi menyudan kerakli bolimni tanlang:
`;

  bot.sendMessage(chatId, welcomeText, {
    reply_markup: {
      keyboard: [
        [{ text: "📚 Kurslar" }, { text: "✍️ Royxatdan otish" }],
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
        `🎓 Bizning oquv markazimizda quyidagi kurslar mavjud:

1️⃣ Ingliz tili  
2️⃣ Rus tili  
3️⃣ Matematika  
4️⃣ Dasturlash (Python, Web)  
5️⃣ Grafik dizayn  

👇 Kursni tanlang, batafsil malumot beraman:
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

    case " Markaz haqida":
      bot.sendMessage(
        chatId,
        `🏫 *100x Academy* — bu zamonaviy ta'lim markazi bolib,
talabalarga til organish, dasturlash va dizayn sohalarida
yuqori sifatli ta'lim beradi.

📍 Manzil: Urganch shahri, Al-Xorazmiy kochasi 45-uy  
📞 Telefon: +998 90 123 45 67  
🌐 Instagram: @100x_academy
        `,
        { parse_mode: "Markdown" }
      );
      break;

    case "✍️ Royxatdan otish":
      bot.sendMessage(
        chatId,
        `✍️ Royxatdan otish uchun quyidagi havola orqali ariza topshiring:
👉 [Royxatdan otish shakli](https://forms.gle/example)

Yoki admin bilan boglaning: @Admin100x`,
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
        `🆘 Yordam uchun quyidagi manzil orqali boglaning:
📞 +998 90 123 45 67  
📩 @Admin100x`
      );
      break;

    default:
      if (!text.startsWith("/")) {
        bot.sendMessage(
          chatId,
          `⚠️ Kechirasiz, bu buyruqni tushunmadim.\n/start buyrugini bosing va menyudan tanlang.`
        );
      }
      break;
  }
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  const courseInfo = {
    english: "🇬🇧 *Ingliz tili kursi*\n\n📆 Muddat: 3 oy\n💰 Narx: 350.000 som/oy\👨‍🏫 Daraja: Beginner — Advanced\n🕒 Darslar: Dushanba, Chorshanba, Juma",
    russian: "🇷🇺 *Rus tili kursi*\n\n📆 Muddat: 3 oy\n💰 Narx: 350.000 som/oy\n🕒 Darslar: Seshanba, Payshanba, Shanba",
    math: "🧮 *Matematika kursi*\n\n📆 Muddat: 4 oy\n💰 Narx: 400.000 som/oy\n🎯 Maqsad: Maktab va abituriyentlar uchun",
    it: "💻 *Dasturlash kursi (Python, Web)*\n\n📆 Muddat: 6 oy\n💰 Narx: 500.000 som/oy\n🔧 Yonalishlar: Frontend, Backend, Python",
    design: "🎨 *Grafik dizayn kursi*\n\n📆 Muddat: 5 oy\n💰 Narx: 450.000 som/oy\n📚 Dasturlar: Photoshop, Illustrator, Figma",
  };

  const info = courseInfo[data] || "Kurs haqida malumot topilmadi.";
  bot.sendMessage(chatId, info, { parse_mode: "Markdown" });
});

