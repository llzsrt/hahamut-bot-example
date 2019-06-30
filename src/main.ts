import { HahamutBot, ReceivedMessage, TextMessage, StickerMessage } from 'hahamut.js';
import { environment } from './environment';

// const bot: HahamutBot = new HahamutBot(environment.config, environment.sslOptions, '/yourprefix');

// 需使用ssl才能正常接收哈哈姆特webhook事件
// 但這邊為方便在本機測試，不傳入ssl options也不開啟驗證signature
const bot: HahamutBot = new HahamutBot(environment.config, null, '/yourprefix', false);

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

    if(message.text === 'test') {
        const tempTextMessage: TextMessage = {
            type: 'text',
            text: '(¯―¯٥)'
        }
        // 傳送文字訊息
        bot.sendMessage(message.senderId, tempTextMessage);
    } else if(message.text === 'Hi') {
        let tempStickerMessage: StickerMessage = {
            type: 'sticker',
            sticker_group: '75',
            sticker_id: '01'
        }
        // 回覆貼圖訊息
        await message.replySticker(tempStickerMessage);
    }
});

bot.boot('0.0.0.0', 1337);