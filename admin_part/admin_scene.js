import { message } from 'telegraf/filters'
import 'dotenv/config'
import * as consts from '../consts.js'
import fs from 'fs';
import { sendExcelFile } from './export.js';
import { bot } from "../consts.js";
import { session, Scenes, Markup } from 'telegraf';

const adminScene = new Scenes.BaseScene('adminScene');

// Обработчик входа в сцену
adminScene.enter((ctx) => {
    ctx.reply('Введите пароль для входа в режим администратора:');
});

// Обработчик ввода пароля
adminScene.on('text', (ctx) => {
    const password = ctx.message.text;
    // Проверка правильности пароля (примерная проверка, замените на вашу логику проверки)
    if (password === process.env.ADMIN_PASSWORD) {
        // Добавление пользователя в файл с администраторами (замените на вашу логику добавления админа в файл)
        const adminId = ctx.from.id;
        const adminUsername = ctx.from.username;
        const adminData = { id: adminId, username: adminUsername };
        try {
            ctx.reply('Вы успешно вошли в режим администратора.');
            ctx.reply('Привет, админ!', {
                reply_markup: {
                    keyboard: [
                        [{ text: 'Создать опрос', web_app: { url: consts.WEB_APP_URL_CREATE } }],
                        ['Посмотреть результаты']
                    ]
                }
            })
            ctx.scene.leave(); // Выход из сцены
        } catch (err) {
            // Обработка ошибок
            console.error(err);
            return;
        }
    } else {
        ctx.reply('Неверный пароль. Попробуйте еще раз или нажмите /cancel для выхода из режима администратора.');
    }
});


// Обработчик команды отмены
adminScene.command('cancel', (ctx) => {
    ctx.reply('Выход из режима администратора.');

    ctx.scene.leave(); // Выход из сцены
});


// admin part
bot.hears('Посмотреть результаты', (ctx) => {
    sendExcelFile(ctx, consts.ansFile, consts.xlsxFile);
});

const sendNotification = async () => {
    const jsonIds = fs.readFileSync(consts.usersFile, 'utf8');
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
    fs.writeFileSync(consts.surveyFile, survey); // записываем опрос в файл
    sendNotification(); // отправляем пользователям уведомление, что новый опрос доступен
});


export default adminScene;
