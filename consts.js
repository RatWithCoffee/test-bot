import { Telegraf } from 'telegraf'

export const WEB_APP_URL_CREATE = 'https://timely-valkyrie-5bbccb.netlify.app';
export const bot = new Telegraf(process.env.BOT_TOKEN)