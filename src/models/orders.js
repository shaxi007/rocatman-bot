import fetchAll from "../lib/postgres.js";
import query from "../repositories/orders.js";
import keyboards from "../lib/keyboards.js";

let sub_categories_key;
let pr_key;
let pr_sub_key;
let products;
let product;
let sub_categories;
let a = false;
let t;

async function orders(text, message_id, chatId, name, username, bot) {
	let categories_key = await fetchAll(true, query.sl_cat_arr);
	let categories = await fetchAll(false, query.sl_cat);

	if (categories_key.array_agg.indexOf(text) > -1) {
		let { id } = categories.find((el) => el.tg_name == text);
		let has = await fetchAll(true, query.sl_ct, chatId, "categories");
		if (!has) {
			await fetchAll(
				true,
				query.ins_btns,
				chatId,
				"{" + categories_key.array_agg.toString() + "}",
				"categories",
				"active"
			);
		}
		sub_categories_key = await fetchAll(true, query.sl_sub_cat_arr, id);
		sub_categories = await fetchAll(false, query.sl_cat_sub, id);
		bot.sendMessage(
			chatId,
			"Do'konlardan birini tanlang!",
			keyboards.category_keybords(sub_categories_key.array_agg)
		);
	}
	if (a) {
		let product = product.find((el) => el.name == text);
		let has = await fetchAll(true, query.sl_ct, chatId, "sub_products");
		if (!has) {
			await fetchAll(
				true,
				query.ins_btns,
				chatId,
				"{" + JSON.stringify(product) + "}",
				"sub_products",
				"active"
			);
		}
		bot.sendMessage(chatId, `${product}`, keyboards.ord_keybords(1, 1));
		a = false;
	} else if (sub_categories_key?.array_agg?.indexOf(text) > -1) {
		let { id } = sub_categories.find((el) => el.name == text);
		let has = await fetchAll(true, query.sl_ct, chatId, "sub_categories");
		pr_key = await fetchAll(true, query.sl_pr_arr, id);
		products = await fetchAll(false, query.sl_pr, id);
		if (!has) {
			await fetchAll(
				true,
				query.ins_btns,
				chatId,
				"{" + sub_categories_key.array_agg.toString() + "}",
				"sub_categories",
				"active"
			);
		}
		bot.sendMessage(
			chatId,
			"Mahsulot kategoriyasini tanlang!",
			keyboards.category_keybords(pr_key.array_agg)
		);
	} else if (pr_key?.array_agg?.indexOf(text) > -1) {
		let { id } = products.find((el) => el.tg_name == text);
		a = true;
		pr_sub_key = await fetchAll(true, query.sl_pr_sub_arr, id);
		product = await fetchAll(false, query.sl_pr_sub, id);
		let has = await fetchAll(true, query.sl_ct, chatId, "products");
		if (!has) {
			await fetchAll(
				true,
				query.ins_btns,
				chatId,
				"{" + pr_key.array_agg.toString() + "}",
				"products",
				"active"
			);
		}
		bot.sendMessage(
			chatId,
			"Mahsulotlardan birini tanlang!",
			keyboards.category_keybords(pr_sub_key.array_agg)
		);
	}

	if (text == "🛍 Buyurtma berish") {
		bot.sendMessage(
			chatId,
			"Ketgoriyalardan birini tanlang!",
			keyboards.category_keybords(categories_key.array_agg)
		);
	}
}

export default { orders };
