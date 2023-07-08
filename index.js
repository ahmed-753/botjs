const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, gamesOptions } = require('./options');
const  token = '6392295528:AAGnmt7H1bL1sEf-Fq8sDL06B-0K91fepW4'

const bot = new TelegramApi(token, { polling: true });
const chats = {};

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю число от 8 до 9, а ты должен его угадать');
    const ran = Math.floor(Math.random() * 10);
    chats[chatId] = ran;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
};

const start = () => {
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие' },
        { command: '/info', description: 'Получить информацию о пользователе' },
        { command: '/game', description: 'Начать игру' },
    ]);

    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(
                chatId,
                'https://cdn.tlgrm.app/stickers/b0d/85f/b0d85fbf-de1b-4aaf-836c-1cddaa16e002/192/1.webp'
            );
            return bot.sendMessage(chatId, `Ты написал мне ${text}`);
        } else if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
        } else if (text === '/game') {
            return startGame(chatId);
        } else {
            return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз!');
        }
    });

    bot.on('callback_query', async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Поздравляю ты отгадал  ${chats[chatId]}`, gamesOptions);
        }
        return await bot.sendMessage(chatId, `К сожалению ты не угадал бот загадал цифру ${data}`, gamesOptions);
    });
};

start();
