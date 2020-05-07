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
    console.log(message.content);
    switch (message.content.substr(0, 1)) {
        case 'S':
            const stockNumber = message.content.substr(1);
            if (stockNumber.length >= 4) {
                const stock = await stockTools.getStock(stockNumber);
                if (stock != undefined) {
                    message.channel.send(stockTools.convertStock(stock));
                } else {
                    message.channel.send("查無資料");
                }
            }
            break;
        default:
            return;
    }
});

//機器人登入
client.login(config.token);