import fetchAll from "../lib/postgres.js";
import query from "../repositories/start.js";
import keyboards from "../lib/keyboards.js";

async function start(text, message_id, chatId, name, username, bot) {
	let check = await fetchAll(true, query.check_st, chatId, 1);
	let check_ques_2 = await fetchAll(true, query.check_st, chatId, 2);
	let check_ques_3 = await fetchAll(true, query.check_st, chatId, 3);
	let check_ques_5 = await fetchAll(true, query.check_st, chatId, 5);
	if (check_ques_5?.status == "yuborildi") {
		if (text > 1900 && text < 2010 && text) {
			await fetchAll(false, query.up_bir_query, text, chatId);
			let user = await fetchAll(true, query.find_us, chatId);
			await fetchAll(
				false,
				query.ins_us,
				user.user_name,
				user.gender,
				user.contact,
				user.bot_user_id,
				user.birth,
				"real_user"
			);
			bot.sendMessage(
				chatId,
				"Botga xush kelibsiz",
				keyboards.menu_keyboards
			);
			await fetchAll(false, query.up_st, chatId, 5, "boldi");
		} else {
			bot.sendMessage(chatId, "Yosh noto'g'ri formatda kiritildi");
		}
	} else if (check_ques_2?.status == "yuborildi") {
		bot.sendMessage(
			chatId,
			"Jinsingizni kiriting",
			keyboards.gender_keyboard
		);
		if (!check_ques_3) {
			await fetchAll(false, query.add_st, 3, "yuborildi", chatId);
		}
		await fetchAll(false, query.up_st, chatId, 3, "yuborildi");
		await fetchAll(false, query.up_st, chatId, 2, "boldi");
		await fetchAll(
			false,
			query.st_query,
			text,
			1,
			999,
			chatId,
			1000,
			"registr"
		);
	} else if (text == "/start" && !check) {
		bot.sendMessage(
			chatId,
			"Assalomu alaykum, botga xush kelibsiz!😊\n\nIsm familiyangizni kiriting:",
			keyboards.remove_keybord
		);
		if (!check_ques_2) {
			await fetchAll(false, query.add_st, 2, "yuborildi", chatId);
		}
		await fetchAll(false, query.up_st, chatId, 2, "yuborildi");
		await fetchAll(false, query.add_st, 1, "yuborildi", chatId);
		await fetchAll(false, query.all_yub, chatId, 2, "yuborilmadi");
	} else if (check && text == "/start") {
		bot.sendMessage(chatId, "Botga xush kelibsiz! 😊");
	}
}
async function call_query(data, message_id, chatId, name, username, bot) {
	if (data == "1" || data == "2") {
		let check_ques_4 = await fetchAll(true, query.check_st, chatId, 4);
		bot.sendMessage(
			chatId,
			"Telefon raqamingizni jo'nating",
			keyboards.contact_keyboard
		);
		if (!check_ques_4) {
			await fetchAll(false, query.add_st, 4, "yuborildi", chatId);
		}
		await fetchAll(false, query.up_st, chatId, 4, "yuborildi");
		await fetchAll(false, query.up_st, chatId, 3, "boldi");
		await fetchAll(false, query.up_gend_query, data, chatId);
		bot.deleteMessage(chatId, message_id);
	} else if (data == "⬅️ Orqaga") {
		bot.sendMessage(chatId, "Asosiy menyudasiz", keyboards.menu_keyboards);
	}
}

async function cont(phone_number, message_id, chatId, name, username, bot) {
	let check_ques_5 = await fetchAll(true, query.check_st, chatId, 5);
	let check_ques_4 = await fetchAll(true, query.check_st, chatId, 4);
	if (check_ques_4.status == "yuborildi") {
		bot.sendMessage(
			chatId,
			"Tug'ilgan yilingizni kiriting",
			keyboards.remove_keybord
		);
		if (!check_ques_5) {
			await fetchAll(false, query.add_st, 5, "yuborildi", chatId);
		}
		await fetchAll(false, query.up_st, chatId, 5, "yuborildi");
		await fetchAll(false, query.up_st, chatId, 4, "boldi");
		await fetchAll(false, query.up_con_query, phone_number, chatId);
	}
}

export { call_query, cont };
export default start;
