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
  criado_em timestamp default now ()
)

-- marcas
CREATE TABLE brands(
  marca_uuid uuid default uuid_generate_v4(),
  nome varchar(100) not null,
  segmento varchar(100) not null,
  descricao text,
  adicionado_em timestamp default now (),
  status boolean default true,
  PRIMARY KEY (marca_uuid)
)