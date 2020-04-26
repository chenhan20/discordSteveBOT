//套件跟設定檔載入的部分
const discord = require("discord.js");
const client = new discord.Client();
const config = require("./config.json");
//登入通知(顯示於下方小黑框)
client.on("ready", () => {
    console.log(`成功登入囉!${client.user.tag}`);
});

// Create an event listener for messages
client.on('message', message => {
    // If the message is "ping"
    if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('pong');
    }
});
// Create an event listener for messages
client.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === 'what is my avatar') {
        // Send the user's avatar URL
        message.reply(message.author.displayAvatarURL());
    }
});

//機器人登入
client.login(config.token);