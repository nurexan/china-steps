// ============================================
// China Steps Telegram Bot (bot.js)
// Ishga tushirish: node bot.js
// ============================================

const https = require("https");

const BOT_TOKEN = "8095290773:AAFUsigsOut1p4wYzW1VMBNE3j5bW3fMUBY";
const ADMIN_ID = "7832781255";
const BOT_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Yuborilgan xabarlar uchun oddiy offset tracker
let offset = 0;

// ===== HTTP HELPER =====
function sendRequest(method, params) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(params);
    const url = new URL(`${BOT_API}/${method}`);

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({});
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ===== XABAR YUBORISH =====
async function sendMessage(chatId, text) {
  return sendRequest("sendMessage", {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
  });
}

// ===== YANGI XABARLARNI OLISH =====
async function getUpdates() {
  try {
    const result = await sendRequest("getUpdates", {
      offset: offset,
      timeout: 30,
      allowed_updates: ["message"],
    });

    if (result.ok && result.result.length > 0) {
      for (const update of result.result) {
        offset = update.update_id + 1;
        await handleUpdate(update);
      }
    }
  } catch (err) {
    console.error("getUpdates xatosi:", err.message);
  }
}

// ===== XABAR BOSHQARUVI =====
async function handleUpdate(update) {
  if (!update.message) return;

  const msg = update.message;
  const chatId = msg.chat.id;
  const text = msg.text || "";
  const firstName = msg.from.first_name || "Noma'lum";
  const username = msg.from.username ? `@${msg.from.username}` : "Username yo'q";
  const userId = msg.from.id;

  // /start buyrug'i
  if (text === "/start" || text.startsWith("/start ")) {
    console.log(`[/start] → ${firstName} (${username}) ID: ${userId}`);

    // Foydalanuvchiga xush kelibsiz xabari
    const welcomeText =
      `🌸 <b>China Steps</b> rasmiy botiga xush kelibsiz!\n\n` +
      `Salom, <b>${firstName}</b>!\n\n` +
      `ℹ️ Bu bot orqali:\n` +
      `• 📚 Xitoy tili kursi kirish kodini olishingiz\n` +
      `• 🎓 Grant va universitetlar haqida ma'lumot so'rashingiz\n` +
      `• 💬 Bepul maslahat uchun murojaat qilishingiz mumkin\n\n` +
      `👤 Savollaringiz uchun: <a href="https://t.me/nurexan">@nurexan</a> ga murojaat qiling\n` +
      `🌐 Saytimiz: <a href="http://chinasteps.uz">chinasteps.uz</a>`;

    await sendMessage(chatId, welcomeText);

    // Adminga bildirishnoma (o'zi admin bo'lsa yubormaymiz)
    if (String(chatId) !== ADMIN_ID) {
      const adminText =
        `🔔 <b>Yangi Foydalanuvchi (Start bosdi)</b>\n\n` +
        `👤 Ism: <b>${firstName}</b>\n` +
        `🔗 Username: ${username}\n` +
        `🆔 Chat ID: <code>${userId}</code>\n` +
        `📱 Qurilma: ${msg.from.language_code || "noma'lum"} tili\n` +
        `⏰ Vaqt: ${new Date().toLocaleString("uz-UZ")}`;

      await sendMessage(ADMIN_ID, adminText);
    }
    return;
  }

  // Kod so'rash
  if (text.toLowerCase().includes("kod") || text.toLowerCase().includes("kurs")) {
    await sendMessage(
      chatId,
      `🔑 <b>Kurs Kirish Kodi</b>\n\nKurs kodini olish uchun:\n\n1️⃣ Saytimizda ro'yxatdan o'ting\n2️⃣ @nurexan ga yozing va kurs uchun to'lov amalga oshiring\n3️⃣ Kod darhol yuboriladi\n\n💬 @nurexan`
    );
    return;
  }

  // Grant so'rash
  if (text.toLowerCase().includes("grant")) {
    await sendMessage(
      chatId,
      `🎓 <b>Xitoy Grantlari</b>\n\nBiz quyidagi grantlar bo'yicha yordam beramiz:\n\n• 🟢 CSC (Xitoy Hukumati) — To'liq grant\n• 🔵 Konfutsiy Instituti — Til granti\n• 🟡 Provinsiya/Universitet — Qisman grant\n\n📋 Batafsil ma'lumot uchun @nurexan ga yozing yoki saytimizga kiring.`
    );
    return;
  }

  // Boshqa har qanday xabar uchun
  await sendMessage(
    chatId,
    `💬 Xabaringiz uchun rahmat, <b>${firstName}</b>!\n\nTezkor javob uchun to'g'ridan to'g'ri @nurexan ga yozing. Biz 24 soat ichida javob beramiz. 🌸`
  );
}

// ===== BOTNI ISHGA TUSHIRISH =====
console.log("=============================================");
console.log("  China Steps Telegram Bot — ISHGA TUSHDI  ");
console.log("=============================================");
console.log(`  Admin ID: ${ADMIN_ID}`);
console.log(`  Vaqt: ${new Date().toLocaleString()}`);
console.log("  Ctrl+C bilan to'xtatiladi.");
console.log("=============================================\n");

// Polling loop
async function startPolling() {
  while (true) {
    await getUpdates();
    // Katta yuklanmalar bo'lmasligi uchun 500ms kutish
    await new Promise((r) => setTimeout(r, 500));
  }
}

startPolling().catch(console.error);
