import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const botToken = "8095290773:AAFUsigsOut1p4wYzW1VMBNE3j5bW3fMUBY";
const chatId = "7832781255";

async function sendTelegram(text: string) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, name, phone, courseCode, text } = body;

    if (type === "contact") {
      // 1. Supabase ga saqlash
      await supabase.from('submissions').insert([{
        name,
        phone,
        source: 'Veb-sayt',
        status: 'KUTILMOQDA',
        message: text || '',
      }]);

      // 2. Telegram xabar
      await sendTelegram(
        `🎯 <b>Yangi Murojaat (China Steps)</b>\n\n` +
        `🧍 Mijoz: <b>${name}</b>\n` +
        `📞 Telefon: <b>${phone}</b>\n` +
        (text ? `📝 Xabar: ${text}\n` : '') +
        `⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`
      );

    } else if (type === "course_access") {
      await sendTelegram(
        `🔒 <b>Kurs Kodi Urunish</b>\n\n` +
        `🔑 Kiritilgan Kod: <code>${courseCode}</code>\n` +
        `⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API xatosi:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
