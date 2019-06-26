import { HahamutBot, HahamutMessage, Message, MessageTrigger, MessageTriggerOperator } from 'hahamut.js';
import { environment } from './environment';

const bot: HahamutBot = new HahamutBot(environment.keys, environment.sslOptions, "/yourprefix");

const exampleMessageTrigger = new MessageTrigger({
    // 設置一個MessageTrigger
    // 若目標訊息中含有sticker、貼圖或ㄊㄓ，則回傳一張通知娘貼圖
    operator: MessageTriggerOperator.Contains,
    content: ["sticker", "貼圖", "ㄊㄓ"],
    action: async (message: HahamutMessage) => {
        // 傳送貼圖
        let tempStickerMessage: Message = {
            type: "sticker",
            sticker_group: "75",
            sticker_id: "01"
        }
        await bot.sendMessage(message.senderId, tempStickerMessage);
    }
});

bot.addCommand("", async (message: HahamutMessage) => {
    // 設定機器人預設指令
    await message.say("Hello, this is default command!");
});
bot.addCommand("say", async (message: HahamutMessage, ...args: any[]) => {
    // 增加機器人指令
    let tmp = args.join(" ");
    await message.say(tmp);
}); 

bot.once("ready", () => {
    console.log("ready");
});

bot.on("message", async (message: HahamutMessage) => {
    // 當機器人收到訊息時

    await exampleMessageTrigger.checkAndRun(message);
    // 使用第6行設置的exampleMessageTrigger檢查訊息

    if(message.text == "test") {
        // 傳送文字訊息
        let tempTextMessage: Message = {
            type: "text",
            text: "(¯―¯٥)"
        }
        await bot.sendMessage(message.senderId, tempTextMessage);
    } else if(message.text == "Hi") {
        // 回覆文字訊息
        await message.say("Hello");
    }
});

bot.boot("localhost", 1337);