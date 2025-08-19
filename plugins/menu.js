// menu.js
const menus = [
  `╭─「 ⚙ Download 」\n│ ⚡ .gdrive\n│ ⚡ .download <url>\n│ ⚡ .facebook\n│ ⚡ .instagram\n│ ⚡ .tiktok\n│ ⚡ .ytmp3\n│ ⚡ .ytmp4\n╰─────────────`,
  `╭─「 🎨 Edit 」\n│ ⚡ .filter\n│ ⚡ .resize\n╰─────────────`,
  `╭─「 ⚙ Group 」\n│ ⚡ .antibot\n│ ⚡ .antilink\n│ ⚡ .grouplink\n│ ⚡ .groupmute\n│ ⚡ .groupunmute\n│ ⚡ .kick\n│ ⚡ .setgcpp\n│ ⚡ .setgroupdesc\n│ ⚡ .tagall\n╰─────────────`,
  `╭─「 🏠 Main 」\n│ ⚡ .creator\n│ ⚡ .owner\n╰─────────────`,
  `╭─「 🔍 Search 」\n│ ⚡ .anime\n│ ⚡ .hentai\n│ ⚡ .yt <query>\n╰─────────────`,
  `╭─「 🔧 Tools 」\n│ ⚡ .channeljid\n│ ⚡ .jid\n│ ⚡ .link\n│ ⚡ .msgid\n│ ⚡ .pp\n╰─────────────`,
  `╭─「 🛠 Utility 」\n│ ⚡ .forward\n│ ⚡ .ipinfo\n│ ⚡ .vv\n╰─────────────`
];

let menuPage = 0;

function getMenuPage(page = 0) {
  if (page < 0) page = menus.length - 1;
  if (page >= menus.length) page = 0;
  menuPage = page;
  return menus[menuPage];
}

function nextPage() {
  return getMenuPage(menuPage + 1);
}

function prevPage() {
  return getMenuPage(menuPage - 1);
}

module.exports = { getMenuPage, nextPage, prevPage };
