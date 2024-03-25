import { Telegraf, Markup } from 'telegraf'
import { message } from 'telegraf/filters'
import 'dotenv/config'
import * as consts from './const.js'


const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', async (ctx) => {
    await ctx.reply('Привет!', {
        reply_markup: {
            keyboard: [
                ['Добавить опрос'],
                ['Посмотреть результаты опроса'],
            ],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
   
});


bot.hears('Добавить опрос', async ctx => {
    await ctx.reply(
        "Launch mini app from  keyboard!",
        Markup.keyboard([Markup.button.webApp("Launch", consts.WEB_APP_URL)]).resize(),
    );


})
bot.hears('Посмотреть результаты опроса', ctx => ctx.reply('AAAAA'))

bot.on(message('web_app_data'), async (ctx) => {
    console.log(ctx.message.web_app_data)
    await ctx.reply(ctx.message.web_app_data.data)
  
  });

  
bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))