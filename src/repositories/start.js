const start_queries = {
	st_query: `insert into users(user_name,gender,contact,bot_user_id,birth,status) values($1,$2,$3,$4,$5,$6)`,
	ins_us: `insert into real_users(user_name,gender,contact,bot_user_id,birth,status) values($1,$2,$3,$4,$5,$6)`,
	up_gend_query: `update users set gender=$1 where bot_user_id=$2`,
	up_con_query: `update users set contact=$1 where bot_user_id=$2`,
	up_contact_query: `update real_users set contact=$1 where bot_user_id=$2`,
	up_bir_query: `update users set birth=$1 where bot_user_id=$2`,
	up_us_query: `update real_users set user_name=$1 where bot_user_id=$2`,
	up_gen_real_query: `update real_users set gender=$1 where bot_user_id=$2`,
	check_st: `select * from questions_users where bot_user_id=$1 and question_id=$2`,
	find_us: `select * from users where bot_user_id=$1 order by user_id desc limit 1`,
	find_us_real: `select * from real_users where bot_user_id=$1 order by user_id desc limit 1`,
	up_st: `update questions_users set status = $3 where bot_user_id=$1 and question_id=$2`,
	add_st: `insert into questions_users(question_id,status,bot_user_id) values($1,$2,$3)`,
	all_yub: `update questions_users set status = $3 where bot_user_id=$1 and question_id<>$2`,
	ins_com: `insert into comments(user_id,bot_user_id,comment_date,comment_title) values($1,$2,$3,$4)`,
};

export default start_queries;
