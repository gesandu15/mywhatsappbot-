const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal");
const { getMenuPage, nextPage, prevPage } = require("./menu");
const { sendStartStatus } = require("./send");
const moment = require("moment");

const BOT_NAME = "M.R.Gesa";
const OWNER_CONTACT = "94784525290";
const BOT_PHOTO = "https://github.com/gesandu1111/ugjv/blob/main/WhatsApp%20Image%202025-08-14%20at%2020.56.15_d6d69dfa.jpg?raw=true";

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info");

  const sock = makeWASocket({ auth: state, printQRInTerminal: true });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) qrcode.generate(qr, { small: true });

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) startBot();
      else console.log("Logged out. Delete auth_info folder to restart.");
    } else if (connection === "open") {
      console.log("✅ Bot Connected!");
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (msg) => {
    const m = msg.messages[0];
    if (!m.message) return;

    const from = m.key.remoteJid;
    const text = m.message.conversation || m.message.extendedTextMessage?.text;
    const command = text?.toLowerCase();

    console.log(`[${moment().format("HH:mm:ss")}] ${from} -> ${text}`);

    // Menu Pagination
    if (command === "menu") {
      await sock.sendMessage(from, {
        text: getMenuPage(),
        buttons: [
          { buttonId: "prev", buttonText: { displayText: "⬅️ Prev" }, type: 1 },
          { buttonId: "next", buttonText: { displayText: "Next ➡️" }, type: 1 }
        ],
        headerType: 1
      });
    } else if (command === "next") {
      await sock.sendMessage(from, {
        text: nextPage(),
        buttons: [
          { buttonId: "prev", buttonText: { displayText: "⬅️ Prev" }, type: 1 },
          { buttonId: "next", buttonText: { displayText: "Next ➡️" }, type: 1 }
        ],
        headerType: 1
      });
    } else if (command === "prev") {
      await sock.sendMessage(from, {
        text: prevPage(),
        buttons: [
          { buttonId: "prev", buttonText: { displayText: "⬅️ Prev" }, type: 1 },
          { buttonId: "next", buttonText: { displayText: "Next ➡️" }, type: 1 }
        ],
        headerType: 1
      });
    }

    // Start / Status Command
    else if (command === "start") {
      await sendStartStatus(sock, from, BOT_NAME, OWNER_CONTACT);
    }

    // Hello
    else if (command === "hi") {
      await sock.sendMessage(from, { text: `Hello 👋 I'm ${BOT_NAME}!` });
    }
  });
}

startBot();
