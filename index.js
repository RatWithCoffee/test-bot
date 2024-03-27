import { message } from 'telegraf/filters'
import 'dotenv/config'
import * as consts from './consts.js'
import fs from 'fs';
import { sendExcelFile } from './admin_part/export.js';
import { bot } from "./consts.js";
import { session, Scenes, Markup } from 'telegraf';

import adminScene from './admin_part/admin_scene.js' 

const stage = new Scenes.Stage([adminScene]);
bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => ctx.reply('Привет! Чтобы пройти опрос введи команду /quiz'))

// Обработчик команды /admin
bot.command('admin', (ctx) => {
    ctx.scene.enter('adminScene');
});



bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))