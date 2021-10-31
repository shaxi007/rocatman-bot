const start_queries = {
	sl_cat: `select * from categories where status='active'`,
	sl_cat_arr: `select array_agg(tg_name) from categories where status='active'`,
	sl_cat_sub: `select * from sub_categories where category_id=$1 and status='enabled'`,
	sl_sub_cat_arr: `select array_agg(name) from sub_categories where category_id=$1 and status='enabled'`,
	sl_pr: `select * from products where sub_categories_id=$1 and status='enabled'`,
	sl_pr_arr: `select array_agg(tg_name) from products where sub_categories_id=$1 and status='enabled'`,
	sl_pr_sub: `select * from sub_products where product_id=$1 and status='enabled' `,
	sl_pr_sub_arr: `select array_agg(name) from sub_products where product_id=$1 and status='enabled'`,
	ins_btns:
		"insert into buttons(bot_user_id,array_butons,button_name,status) values($1,$2,$3,$4)",
	sl_ct: "select * from buttons where bot_user_id=$1 and button_name=$2",
	sl_pro: "select * from sub_products where id=$1 ",
};

export default start_queries;
