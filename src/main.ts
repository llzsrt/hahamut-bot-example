import { HahamutBot, HahamutMessage, Message, MessageFilter, FilterMethod } from 'hahamut.js';
import { environment } from './environment';

const bot: HahamutBot = new HahamutBot(environment.keys, environment.sslOptions, "/yourprefix");

const exampleMessageFilter = new MessageFilter({
    // 設置一個訊息過濾器
    // 若目標訊息中含有sticker、貼圖或ㄊㄓ，則回傳一張通知娘貼圖
    method: FilterMethod.Find,
    content: ["sticker", "貼圖", "ㄊㄓ"],
    action: (message: HahamutMessage) => {
        // 傳送貼圖
        let tempStickerMessage: Message = {
            type: "sticker",
            sticker_group: "75",
            sticker_id: "01"
        }
        bot.sendMessage(message.senderId, tempStickerMessage);
    }
});

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
    // 當機器人收到訊息時

    exampleMessageFilter.filter(message);
    // 使用第6行設置的exampleMessageFilter檢查訊息

    if(message.text == "test") {
        // 傳送文字訊息
        let tempTextMessage: Message = {
            type: "text",
            text: "(¯―¯٥)"
        }
        bot.sendMessage(message.senderId, tempTextMessage);
    } else if(message.text == "Hi") {
        // 回覆文字訊息
        message.say("Hello");
    }
});

bot.boot();