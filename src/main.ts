import { HahamutBot, HahamutMessage, Message } from 'hahamut.js';
import { environment } from './environment';

const bot: HahamutBot = new HahamutBot(environment.keys, environment.sslOptions, "/yourprefix");

bot.addCommand("", (message: HahamutMessage) => {
    // 設定機器人預設指令
    message.say("Hello, this is default command!");
});
bot.addCommand("say", (message: HahamutMessage, ...args: any[]) => {
    // 增加機器人指令
    let tmp = args.join(" ");
    message.say(tmp);
}); 

bot.once("ready", () => {
    console.log("ready");
});

bot.on("message", (message: HahamutMessage) => {
    if(message.text == "test") {
        // 傳送文字訊息
        let tempTextMessage: Message = {
            type: "text",
            text: "(¯―¯٥)"
        }
        bot.sendMessage(message.senderId, tempTextMessage);
    } else if (message.text == "sticker") {
        // 傳送貼圖
        let tempStickerMessage: Message = {
            type: "sticker",
            sticker_group: "75",
            sticker_id: "01"
        }
        bot.sendMessage(message.senderId, tempStickerMessage);
    } else if(message.text == "Hi") {
        // 回覆文字訊息
        message.say("Hello");
    }
});

bot.boot();