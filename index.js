import { message } from 'telegraf/filters'
import 'dotenv/config'
import * as consts from './consts.js'
import fs from 'fs';
import { sendExcelFile } from './export.js';
import { bot } from "./consts.js";

const xlsxFile = "responses.xlsx"; // файл для хранения созданного xlsx
const usersFile = "users_id.json"; // файл содержащий id пользователей
const surveyFile = "survey.json";
const db = "db.json";

bot.start(async (ctx) =>
    await ctx.reply('Привет, админ!', {
        reply_markup: {
            keyboard: [
                [{ text: 'Создать опрос', web_app: { url: consts.WEB_APP_URL_CREATE } }],
                ['Посмотреть результаты']
            ]
        }
    })
);

bot.hears('Посмотреть результаты', (ctx) => {
    sendExcelFile(ctx, db, xlsxFile);
});


const sendNotification = async () => {
    const jsonIds = fs.readFileSync( usersFile, 'utf8');
    const ids = JSON.parse(jsonIds).users;
    for (let id in ids) {
        await bot.telegram.sendMessage(id, "Пройдите новый опрос. Используйте команду /quiz, чтобы начать")
            .then(() => console.log('Сообщение успешно отправлено'))
            .catch((error) => console.error('Ошибка отправки сообщения:', error));;

    }
}

bot.on(message('web_app_data'), (ctx) => {
    const survey = ctx.message.web_app_data.data;
    console.log("Новый опрос получен: ", survey);
    fs.writeFileSync(surveyFile, survey); // записываем опрос в файл
    sendNotification(); // отправляем пользователям уведомление, что новый опрос доступен
});


bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))