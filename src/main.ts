import { HahamutBot, ReceivedMessage, StickerMessage, MessageTrigger, TriggerOperator } from 'hahamut.js';
import { environment } from './environment';

// const bot: HahamutBot = new HahamutBot(environment.config, environment.sslOptions);

// 為方便在本機測試，不傳入ssl options也不開啟驗證signature
const bot: HahamutBot = new HahamutBot(environment.configs);

// 增加機器人指令 say
// e.g. 使用者輸入 "/yourprefix say Hi! I'm Bot"，機器人將會回應文字訊息 "Hi! I'm Bot"
bot.addCommand('say', async (message: ReceivedMessage, ...args: any[]) => {
    try {
        const temp = args.join(' ');
        const bahaResult = message.replyText(temp);

        console.log(`Send message "${temp}" to ${message.senderId}.`);
        console.log(`API return: ${await bahaResult}`);
    } catch (error) {
        console.error(error);
    }
});

// 設置一個MessageTrigger
// 若目標訊息中含有sticker、貼圖或ㄊㄓ，則回傳一張通知娘貼圖
const exampleMessageTrigger = new MessageTrigger({
    operator: TriggerOperator.Contains,
    content: ["sticker", "貼圖", "ㄊㄓ"],
    action: (message: ReceivedMessage) => {
        return bot.sendMessage(message.senderId, {
            type: "sticker",
            sticker_group: "75",
            sticker_id: "01"
        });
    }
});

// 當機器人收到訊息時
bot.on('message', async (message: ReceivedMessage) => {
    try {
        // 使用前面設置的exampleMessageTrigger檢查訊息
        await exampleMessageTrigger.checkAndRun(message);
    } catch (error) {
        console.error(error);
    }
});

// 當機器人收到訊息時
bot.on('message', (message: ReceivedMessage) => {
    if (message.text === 'Hi') {
        try {
            // 回覆文字訊息
            message.replyText('Hello');
            // 回覆貼圖訊息
            const tempStickerMessage: StickerMessage = {
                type: 'sticker',
                sticker_group: '75',
                sticker_id: '01'
            }
            message.replySticker(tempStickerMessage);
        } catch (error) {
            console.error(error);
        }
    }
});

const PORT = process.env.PORT || 1337;
bot.boot(PORT);