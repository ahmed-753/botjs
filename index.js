const  TelegramApi = require('node-telegram-bot-api')

const  token = '6392295528:AAGnmt7H1bL1sEf-Fq8sDL06B-0K91fepW4'




const start = () => {

    const  bot = new TelegramApi(token,({polling:true}))

    bot.setMyCommands([
        {command:'/start',description:'Начальное приведствие'},
        {command:'/info',description:'Получить информацию о пользователе'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const  chatId = msg.chat.id

        if(text === '/start') {
            await bot.sendSticker(chatId,'https://cdn.tlgrm.app/stickers/b0d/85f/b0d85fbf-de1b-4aaf-836c-1cddaa16e002/192/1.webp')
            return  bot.sendMessage(chatId, `Ты написал мне ${text}`)
        }
        if(text === '/info'){
            return  bot.sendMessage(chatId,`тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game'){
            await bot.sendMessage(chatId,'Сечас я загадаю от 8 до 9 а ты должен его угадать')
           // const ran = Math.floor(Math.random() * 10)
        }
        return  bot.sendMessage(chatId,'я тебя не понимаю , попробуй ещё раз!')
    })

}

start()