//套件跟設定檔載入的部分
const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
const stockTools = require("./stockTools.js");

//登入通知(顯示於下方小黑框)
client.on("ready", () => {
    console.log(`成功登入囉!${client.user.tag}`);
});

// Create an event listener for messages
client.on('message', async message => {
    if (message.content === '/stock') {
        const stock = await stockTools.getStock("2330");
        message.channel.send(stock);
    }
});

//機器人登入
client.login(config.token);