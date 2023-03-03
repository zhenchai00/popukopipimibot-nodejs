require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

// describe('Test Telegram Bot', () => {
//     let bot 
//     let chatId

//     beforeEach(() => {
//         chatId = 12345
//         bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling:false })
//         bot.sendMessage.mockClear()
//     });

//     test('Test Connection with Telegram Bot', async () => {
//         expect();
//     });
// })

// test('Test Telegram Bot Connection', () => {
//     let bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });
//     expect(bot).any(String);
// });
describe('My Test Suite', () => {
    it('My Test Case', () => {
        expect(true).toEqual(true);
    });
});