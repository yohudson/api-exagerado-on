-- gerador uuid
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- obter tabelas
SELECT *
FROM pg_catalog.pg_tables
where tableowner = 'bltzqqmq'

-- usuário
CREATE TABLE users(
  user_uuid uuid DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(11) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  genero INTEGER,
  senha VARCHAR(100) NOT NULL,
  criado_em TIMESTAMP DEFAULT NOW(),
  status BOOLEAN DEFAULT TRUE,
  PRIMARY KEY (user_uuid)
)

-- questionário
CREATE TABLE questionario (
  questionario_uuid uuid DEFAULT uuid_generate_v4 (),
  horario_compras_manha BOOLEAN,
  horario_compras_tarde BOOLEAN,
  horario_compras_noite BOOLEAN,
  conhece_evento BOOLEAN,
  melhor_dia_quarta BOOLEAN,
  melhor_dia_quinta BOOLEAN,
  melhor_dia_sexta BOOLEAN,
  melhor_dia_sabado BOOLEAN,
  melhor_dia_domingo BOOLEAN,
  forma_pagamento_dinheiro BOOLEAN,
  forma_pagamento_credito BOOLEAN,
  forma_pagamento_debito BOOLEAN,
  forma_pagamento_pix BOOLEAN,
  forma_pagamento_picpay BOOLEAN,
  cidade_origem VARCHAR(100),
  como_soube VARCHAR(100),
  fechamento_amigx BOOLEAN,
  fechamento_familia BOOLEAN,
  fechamento_namoradx BOOLEAN,
  fechamento_sozinho BOOLEAN,
  recado TEXT,
  respondido_em TIMESTAMP DEFAULT NOW (),
  user_uuid VARCHAR(100) NOT NULL,
  status BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_uuid) REFERENCES users (user_uuid),
  PRIMARY KEY (questionario_uuid)
)

-- loja
CREATE TABLE store(
  loja_uuid uuid default uuid_generate_v4 (),
  nome varchar(100) not null,
  localizacao varchar(100) not null,
  adicionado_em timestamp default now (),
  status boolean default true,
  PRIMARY KEY (loja_uuid)
)

-- segmentos
CREATE TABLE segments(
  segmento_uuid uuid default uuid_generate_v4(),
  nome varchar(100) not null,
  status boolean default true,
  criado_em timestamp default now (),
  PRIMARY KEY (segmento_uuid)
)

-- marcas
CREATE TABLE brands(
  marca_uuid uuid default uuid_generate_v4(),
  nome varchar(100) not null,
  segmento_uuid uuid,
  adicionado_em timestamp default now (),
  status boolean default true,
  PRIMARY KEY (marca_uuid),
  FOREIGN KEY (segmento_uuid) REFERENCES segments (segmento_uuid)
)

INSERT INTO brands(nome,segmento_uuid)
VALUES ()
RETURNING *

-- marcas favoritas
CREATE TABLE favbrands(
  fav_uuid uuid default uuid_generate_v4(),
  lista_favoritos text [],
  user_uuid uuid,
  adicionado_em timestamp default now (),
  status boolean default true,
  PRIMARY KEY (fav_uuid),
  FOREIGN KEY (user_uuid) REFERENCES users (user_uuid)
)

INSERT INTO favbrands(user_uuid,lista_favoritos)
VALUES ()
RETURNING *

/*
69d08850-c079-4335-907e-8e3ed72c5fd7	Feminino
b8d06f06-54bf-49af-86f6-30c356ae817c	Masculino
f1f97d9f-ee62-4aa4-adf6-a70ac2e69785	Infantil
874f9461-aaaa-411c-95ec-00941474acdd	Esporte
65f0c818-28d9-4c68-8206-37d60c186860	Móveis
1b23bf88-b9b8-4aff-9bfc-547907990660	Acessórios
5f0db6ee-75bd-4bc3-b8f7-d5144494d307	Cosméticos
*/