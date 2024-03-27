import { Telegraf } from 'telegraf'

export const WEB_APP_URL_CREATE = 'https://timely-valkyrie-5bbccb.netlify.app';
export const bot = new Telegraf(process.env.BOT_TOKEN)

export const filesPath = "/data"

export const xlsxFile = "responses.xlsx"; // файл для хранения созданного xlsx
export const usersFile = "users_id.json"; // файл содержащий id пользователей
export const surveyFile = "survey.json";
export const ansFile = "ans.json";
