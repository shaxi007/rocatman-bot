create table users(
	user_id serial primary key,
	user_name varchar(63) not null,
	gender int not null,
	contact bigint not null,
	bot_user_id bigint not null,
	status varchar(200),
	birth int 
);

create table real_users(
	user_id serial primary key,
	user_name varchar(63) not null,
	gender int not null,
	contact bigint not null,
	bot_user_id bigint not null,
	status varchar(200),
	birth int 
);

create table questions(
	question_title varchar(300) not null,
	question_id serial primary key
);

create table questions_users(
	question_id int references questions(question_id) on delete cascade,
	bot_user_id bigint not null,
	status varchar(200) not null
);

create table comments(
	id serial primary key,
	user_id int references real_users(user_id),
	bot_user_id bigint not null,
	comment_date bigint not null,
	comment_title text not null
);


create table buttons(
	bot_user_id bigint not null,
	array_butons varchar[] not null,
  	button_name varchar(255),
  	status varchar(255)  
);




