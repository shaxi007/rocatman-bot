import fetchAll from "../lib/postgres.js";
import query from "../repositories/orders.js";
import keyboards from "../lib/keyboards.js";
async function ordersCal(data, message_id, chatId, name, username, bot) {
	data = data.split("#");
	let send_text = ``;
	if (data.length > 1 && data[2] == "+") {
		data[1] = +data[1] + 1;
		bot.editMessageText("Quyidagilardan birini tanlang:", {
			message_id: message_id,
			chat_id: chatId,
			...keyboards.ord_keybords(data[0], data[1]),
		});
	}
	if (data.length > 1 && data[1] > 1 && data[2] == "-") {
		data[1] = +data[1] - 1;
		bot.editMessageText("Quyidagilardan birini tanlang:", {
			message_id: message_id,
			chat_id: chatId,
			...keyboards.ord_keybords(data[0], data[1]),
		});
	}
}
export default ordersCal;
