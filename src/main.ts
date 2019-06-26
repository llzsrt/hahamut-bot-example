import { HahamutBot, HahamutMessage, Message, MessageTrigger, MessageTriggerOperator } from 'hahamut.js';
import { environment } from './environment';

const bot: HahamutBot = new HahamutBot(environment.keys, environment.sslOptions, "/yourprefix");

// 設置一個MessageTrigger
const exampleMessageTrigger = new MessageTrigger({
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

// 設定機器人預設指令
bot.addCommand("", async (message: HahamutMessage) => {
    await message.say("Hello, this is default command!");
});

// 增加機器人指令
bot.addCommand("say", async (message: HahamutMessage, ...args: any[]) => {
    let tmp = args.join(" ");
    await message.say(tmp);
}); 

bot.once("ready", () => {
    console.log("ready");
});

// 當機器人收到訊息時
bot.on("message", async (message: HahamutMessage) => {

    const promiseList = [];

    // 使用第6行設置的exampleMessageTrigger檢查訊息
    promiseList.push(exampleMessageTrigger.checkAndRun(message));

    if(message.text == "test") {
        const tempTextMessage: Message = {
            type: "text",
            text: "(¯―¯٥)"
        }
        // 傳送文字訊息
        promiseList.push(bot.sendMessage(message.senderId, tempTextMessage));
    } else if(message.text == "Hi") {
        // 回覆文字訊息
        promiseList.push(message.say("Hello"));
    }

    await Promise.all(promiseList);
});

bot.boot("localhost", 1337);