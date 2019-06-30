import { HahamutBot, ReceivedMessage, TextMessage, StickerMessage, MessageTrigger, TriggerOperator } from 'hahamut.js';
import { environment } from './environment';

// const bot: HahamutBot = new HahamutBot(environment.config, environment.sslOptions, '/yourprefix');

// 需使用ssl才能正常接收哈哈姆特webhook事件
// 為方便在本機測試，不傳入ssl options也不開啟驗證signature
const bot: HahamutBot = new HahamutBot(environment.configs, null, '/yourprefix', false);

// 增加機器人指令 say
// e.g. 使用者輸入 "/yourprefix say Hi! I'm Bot"，機器人將會回應文字訊息 "Hi! I'm Bot"
bot.addCommand('say', async (message: ReceivedMessage, ...args: any[]) => {
    try {
        const temp = args.join(' ');
        const bahaResult = await message.replyText(temp);

        console.log(`Send message "${temp}" to ${message.senderId}.`);
        console.log(`API return: ${bahaResult}`);
    } catch (error) {
        console.error(error);
    }
});

// 設置一個MessageTrigger
const exampleMessageTrigger = new MessageTrigger({
    // 若目標訊息中含有sticker、貼圖或ㄊㄓ，則回傳一張通知娘貼圖
    operator: TriggerOperator.Contains,
    content: ["sticker", "貼圖", "ㄊㄓ"],
    action: (message: ReceivedMessage) => {
        // 傳送貼圖
        return bot.sendMessage(message.senderId, {
            type: "sticker",
            sticker_group: "75",
            sticker_id: "01"
        });
    }
});

// 當機器人收到訊息時
bot.on('message', (message: ReceivedMessage) => {

    if(message.text === 'Hi') {
        let tempStickerMessage: StickerMessage = {
            type: 'sticker',
            sticker_group: '75',
            sticker_id: '01'
        }
        // 回覆貼圖訊息
        message.replySticker(tempStickerMessage);
    }

    // 使用前面設置的exampleMessageTrigger檢查訊息
    // 若符合條件會接著執行exampleMessageTrigger.action
    exampleMessageTrigger.checkAndRun(message);
});

const PORT = process.env.PORT || 1337;
bot.boot(PORT);