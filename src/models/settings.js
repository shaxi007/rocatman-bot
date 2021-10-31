import fetchAll from "../lib/postgres.js";
import query from "../repositories/start.js";
import keyboards from "../lib/keyboards.js";

async function settings(text, message_id, chatId, name, username, bot) {
	if (text == "⚙️ Sozlamalar") {
		let user = await fetchAll(true, query.find_us_real, chatId);
		let send_text = `Ism familiyangiz: ${user.user_name}

Jinsingiz: ${user.gender == 1 ? "Erkak" : "Ayol"}

Telefon raqamingiz: +${user.contact}

Ma'lumotlaringizni o'zgartirish uchun quyidagi tugmalardan birini tanlang! `;
		bot.sendMessage(
			chatId,
			"Sizning soznalmalaringiz:",
			keyboards.st_or_keyboards
		);
		bot.sendMessage(chatId, send_text, keyboards.keybords(chatId));
	}
	let check_ques_7 = await fetchAll(true, query.check_st, chatId, 7);
	let check_ques_8 = await fetchAll(true, query.check_st, chatId, 8);
	if (check_ques_7?.status == "yuborildi") {
		await fetchAll(false, query.up_st, chatId, 7, "boldi");
		await fetchAll(false, query.up_us_query, text, chatId);
		bot.sendMessage(chatId, "O'zgartirildi");
	} else if (check_ques_8?.status == "yuborildi") {
		await fetchAll(false, query.up_st, chatId, 8, "boldi");
		await fetchAll(false, query.up_contact_query, text, chatId);
		bot.sendMessage(chatId, "O'zgartirildi");
	}
}

async function settings_call(data, message_id, chatId, name, username, bot) {
	let dt = data.split("?");
	let check_ques_7 = await fetchAll(true, query.check_st, chatId, 7);
	let check_ques_8 = await fetchAll(true, query.check_st, chatId, 8);
	if (dt.length > 1 && dt[0] == "user_name") {
		bot.sendMessage(chatId, "Ism familayngizni jo'nating:");
		if (!check_ques_7) {
			await fetchAll(false, query.add_st, 7, "yuborildi", chatId);
		}
		await fetchAll(false, query.up_st, chatId, 7, "yuborildi");
	} else if (dt.length > 1 && dt[0] == "gender") {
		bot.sendMessage(
			chatId,
			"Jinsingizni kiriting",
			keyboards.gender_up_keyboard
		);
	} else if (dt.length > 1 && dt[0] == "contact") {
		if (!check_ques_8) {
			await fetchAll(false, query.add_st, 8, "yuborildi", chatId);
		}
		await fetchAll(false, query.up_st, chatId, 8, "yuborildi");
		bot.sendMessage(chatId, "Kontaktingizni kiriting");
	} else if (data == "1up") {
		await fetchAll(false, query.up_gen_real_query, data[0], chatId);
		bot.sendMessage(chatId, "O'zgartirildi");
	} else if (data == "2up") {
		await fetchAll(false, query.up_gen_real_query, data[0], chatId);
		bot.sendMessage(chatId, "O'zgartirildi");
	}
}
export default { settings, settings_call };
