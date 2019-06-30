import { HahamutBot, ReceivedMessage, MessageTrigger, TextMessage, StickerMessage } from 'hahamut.js';
import { TriggerOperator } from 'hahamut.js/enums';

import { environment } from './environment';


const bot: HahamutBot = new HahamutBot(environment.config, null, '/yourprefix', false);

// 設置一個MessageTrigger
const exampleMessageTrigger = new MessageTrigger({
    // 若目標訊息中含有sticker、貼圖或ㄊㄓ，則回傳一張通知娘貼圖
    operator: TriggerOperator.Contains,
    content: ['sticker', '貼圖', 'ㄊㄓ'],
    action: async (message: ReceivedMessage) => {
        let tempStickerMessage: StickerMessage = {
            type: 'sticker',
            sticker_group: '75',
            sticker_id: '01'
        }
        // 回覆貼圖訊息
        await message.replySticker(tempStickerMessage);
    }
});

// 設定機器人預設指令
bot.addCommand('', async (message: ReceivedMessage) => {
    await message.replyText('Hello, this is default command!');
});

// 增加機器人指令
bot.addCommand('say', async (message: ReceivedMessage, ...args: any[]) => {
    let tmp = args.join(' ');
    await message.replyText(tmp);
}); 

bot.once('ready', async () => {
    console.log('Ready');
});

// 當機器人收到訊息時
bot.on('message', async (message: ReceivedMessage) => {

    const promiseList = [];

    // 使用第10行設置的exampleMessageTrigger檢查訊息
    exampleMessageTrigger.checkAndRun(message);

    if(message.text == 'test') {
        const tempTextMessage: TextMessage = {
            type: 'text',
            text: '(¯―¯٥)'
        }
        // 傳送文字訊息
        bot.sendMessage(message.senderId, tempTextMessage);
    } else if(message.text == 'Hi') {
        // 回覆文字訊息
        message.replyText('Hello');
    }

    await Promise.all(promiseList);
});

bot.boot('0.0.0.0', 1337);