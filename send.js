// send.js
async function sendStartStatus(sock, from, BOT_NAME, OWNER_CONTACT) {
  await sock.sendMessage(from, { text: `✅ ${BOT_NAME} Connected!\n👨‍💻 Owner: wa.me/${OWNER_CONTACT}` });
}

module.exports = { sendStartStatus };
