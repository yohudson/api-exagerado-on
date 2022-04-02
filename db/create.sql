create table users (
  user_id serial primary key,
  nome varchar(255) not null,
  email varchar(255) not null,
  criado_em timestamp default now()
);

insert into users (nome, email) values ($1, $2)