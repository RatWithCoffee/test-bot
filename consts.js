import { Telegraf } from 'telegraf'

export const WEB_APP_URL_CREATE = 'https://timely-valkyrie-5bbccb.netlify.app';
export const bot = new Telegraf(process.env.BOT_TOKEN)

const filesPath = "data/"

export const xlsxFile = filesPath + "responses.xlsx"; // файл для хранения созданного xlsx
export const usersFile = filesPath + "users_id.json"; // файл содержащий id пользователей
export const surveyFile = filesPath + "survey.json";
export const ansFile = filesPath + "ans.json";
