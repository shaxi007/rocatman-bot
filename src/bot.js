import dotenv from "dotenv";
import path from "path";
import TelegramBot from "node-telegram-bot-api";
import start from "./models/start.js";
import buttons from "./models/buttons.js";
import settings from "./models/settings.js";
import orders from "./models/orders.js";
import orderCal from "./models/ordersCall.js";
import { call_query, cont } from "./models/start.js";
import keyboards from "./lib/keyboards.js";

const TOKEN = process.env.CLIENT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const start_bot = () => {
	bot.on("message", (msg) => {
		let {
			text,
			message_id,
			chat: { id: chatId, first_name: name, username },
			date,
		} = msg;

		start(text, message_id, chatId, name, username, bot);
		buttons(text, message_id, chatId, name, username, bot, date);
		settings.settings(text, message_id, chatId, name, username, bot);
		orders.orders(text, message_id, chatId, name, username, bot);
	});
	bot.on("callback_query", (msg) => {
		let {
			data,
			message: {
				message_id,
				chat: { id: chatId, first_name: name, username },
			},
		} = msg;
		call_query(data, message_id, chatId, name, username, bot);
		settings.settings_call(data, message_id, chatId, name, username, bot);
		orderCal(data, message_id, chatId, name, username, bot);
	});

	bot.on("contact", (msg) => {
		let {
			contact: { phone_number },
			message_id,
			chat: { id: chatId, first_name: name, username },
		} = msg;
		cont(phone_number, message_id, chatId, name, username, bot);
	});
};

start_bot();
export default bot;
