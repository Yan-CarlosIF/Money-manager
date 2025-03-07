create table
	transactions (
		id serial primary key,
		description varchar(100) not null,
		type type_transaction not null,
		category varchar(50) not null,
		price float not null,
		created_at timestamp not null
	);