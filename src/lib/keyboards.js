let contact_keyboard = {
	reply_markup: {
		keyboard: [
			[
				{
					text: "Kontaktni yuborish",
					request_contact: true,
				},
			],
		],
		resize_keyboard: true,
	},
};

let gender_keyboard = {
	reply_markup: {
		inline_keyboard: [
			[
				{ text: "Erkak", callback_data: "1" },
				{ text: "Ayol", callback_data: "2" },
			],
		],
	},
	parse_mode: "html",
};
let gender_up_keyboard = {
	reply_markup: {
		inline_keyboard: [
			[
				{ text: "Erkak", callback_data: "1up" },
				{ text: "Ayol", callback_data: "2up" },
			],
		],
	},
	parse_mode: "html",
};

let remove_keybord = {
	reply_markup: {
		remove_keyboard: true,
	},
};

let menu_keyboards = {
	reply_markup: {
		keyboard: [
			["🛍 Buyurtma berish", "📨 Talab va takliflar"],
			["⚙️ Sozlamalar", "✅ Buyurtmalarim"],
			["📥 Savatcha"],
		],
		resize_keyboard: true,
		one_time_keyboard: true,
	},
	parse_mode: "html",
};

let taklif_keyboards = {
	reply_markup: {
		keyboard: [["🗳 Taklif bildirish", "📝 Oferta"], ["⬅️ Orqaga"]],
		resize_keyboard: true,
		one_time_keyboard: true,
	},
	parse_mode: "html",
};

let st_or_keyboards = {
	reply_markup: {
		keyboard: [["⬅️ Orqaga"]],
		resize_keyboard: true,
		one_time_keyboard: true,
	},
	parse_mode: "html",
};
let html_option = {
	parse_mode: "html",
};

let oferta_keyboard = {
	reply_markup: {
		inline_keyboard: [
			[
				{
					text: "Manzilga o'tish",
					url: "https://telegra.ph/Publichnaya-oferta-ROCKETMAN-06-19",
				},
				{ text: "⬅️ Orqaga", callback_data: "⬅️ Orqaga" },
			],
		],
	},
	parse_mode: "html",
};

function keybords(chatId) {
	return {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: "Ism familiya",
						callback_data: "user_name?" + chatId,
					},
					{ text: "Jins", callback_data: "gender?" + chatId },
					{
						text: "Telefon raqam",
						callback_data: "contact?" + chatId,
					},
				],
			],
		},
		parse_mode: "html",
	};
}

function category_keybords(arr) {
	let key_arr = [];
	let keyb_arr = [];
	arr.forEach((el, index) => {
		key_arr.push(el);
		if ((index + 1) % 2 == 0) {
			keyb_arr.push(key_arr);
			key_arr = [];
		}
		if (arr.length % 2 == 1 && index == arr.length - 1) {
			keyb_arr.push([arr[index]]);
		}
	});
	return {
		reply_markup: {
			keyboard: [...keyb_arr, ["⬅️ Orqaga", "🛒 Rasmiylashtirish"]],
		},
		parse_mode: "html",
	};
}

function ord_keybords(id, count) {
	return {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: "➖",
						callback_data: `${id}#${count}#-`,
					},
					{
						text: `${count}`,
						callback_data: `${id}#${count}`,
					},
					{ text: "➕", callback_data: `${id}#${count}#+` },
				],
				[{ text: "Savatga qo'shish", callback_data: `${id}#${count}` }],
			],
		},
		parse_mode: "html",
	};
}

export default {
	contact_keyboard,
	gender_keyboard,
	remove_keybord,
	menu_keyboards,
	taklif_keyboards,
	html_option,
	oferta_keyboard,
	keybords,
	st_or_keyboards,
	gender_up_keyboard,
	category_keybords,
	ord_keybords,
};
