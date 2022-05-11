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
  PRIMARY KEY (user_uuid),
  perfil_id INTEGER,
  FOREIGN KEY (perfil_id) REFERENCES profile (perfil_id)
)

INSERT INTO users (nome, telefone, email, data_nascimento, genero, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *

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

INSERT INTO quiz (horario_compras_manha, horario_compras_tarde, horario_compras_noite, conhece_evento,melhor_dia_quarta,melhor_dia_quinta ,melhor_dia_sexta ,melhor_dia_sabado ,melhor_dia_domingo ,forma_pagamento_dinheiro ,forma_pagamento_credito ,forma_pagamento_debito ,forma_pagamento_pix ,forma_pagamento_picpay ,cidade_origem ,como_soube ,fechamento_amigx ,fechamento_familia ,fechamento_namoradx ,fechamento_sozinho ,recado ,user_uuid ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22) RETURNING *

-- segmentos
CREATE TABLE segments(
  segmento_uuid uuid default uuid_generate_v4(),
  nome varchar(100) not null,
  status boolean default true,
  criado_em timestamp default now (),
  PRIMARY KEY (segmento_uuid)
)

INSERT INTO segments (nome) VALUES ($1) RETURNING *

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

INSERT INTO brands (nome,segmento_uuid) VALUES ($1,$2) RETURNING *

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

INSERT INTO favbrands (lista_favoritos,user_uuid) VALUES ($1,$2) RETURNING *

--gêneros
CREATE TABLE genders(
  genero_id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
)

INSERT INTO genders (nome) VALUES ($1) RETURNING *

--perfil
CREATE TABLE profile(
	perfil_id serial primary key,
	perfil_nome VARCHAR(255) NOT NULL,
	descricao VARCHAR(500),
	criado_em date default now (),
  status boolean default true
);

INSERT INTO profile(perfil_nome,descricao) VALUES ($1,$2) RETURNING *

--itens do menu
CREATE TABLE item_menu(
	item_uuid UUID DEFAULT UUID_GENERATE_V4(),
	menu_nome VARCHAR(255) NOT NULL,
	menu_url VARCHAR(255) NOT NULL,
  perfil_id INTEGER,
	criado_em DATE DEFAULT NOW (),
  status BOOLEAN DEFAULT TRUE,
  FOREIGN KEY perfil_id REFERENCES profile(perfil_id)
);

INSERT INTO item_menu(menu_nome,menu_url) VALUES ($1,$2) RETURNING *

--loja
CREATE TABLE stores(
   loja_uuid UUID DEFAULT UUID_GENERATE_V4(),
   loja_nome VARCHAR(255) NOT NULL,
   loja_cnpj VARCHAR(14) NOT NULL,
   lista_segmentos TEXT [],
   marcas_vendidas TEXT [],
   nome_responsavel VARCHAR(50),
   telefone_contato VARCHAR(11),
   email_contato VARCHAR(50),
   criado_em DATE DEFAULT NOW (),
   status BOOLEAN DEFAULT TRUE,
   localizacao VARCHAR(100)
);

INSERT INTO stores(loja_nome,loja_cnpj,lista_segmentos,marcas_vendidas,nome_responsavel,telefone_contato,email_contato,status,localizacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *

--atrações
CREATE TABLE attractions(
  atracao_uuid UUID DEFAULT UUID_GENERATE_V4(),
  atracao_nome VARCHAR(255) NOT NULL,
  nome_contato VARCHAR(100) NOT NULL,
  telefone_contato VARCHAR(11),
  email_contato VARCHAR(100),
  status BOOLEAN DEFAULT TRUE
)

INSERT INTO attractions(atracao_nome,nome_contato,telefone_contato,email_contato,status) VALUES ($1,$2,$3,$4,$5) RETURNING *

--agenda de atrações
CREATE TABLE agenda(
  agenda_uuid UUID DEFAULT UUID_GENERATE_V4() PRIMARY KEY,
  atracao_uuid UUID NOT NULL,
  atracao_nome VARCHAR(100),
  data_hora_inicio TIMESTAMP,
  data_hora_fim TIMESTAMP,
  local VARCHAR(100),
  status BOOLEAN DEFAULT FALSE,
  descricao TEXT,
  FOREIGN KEY (atracao_uuid) REFERENCES attractions(atracao_uuid)
)

INSERT INTO agenda(atracao_uuid,atracao_nome,data_hora_inicio,data_hora_fim,local,status,descricao) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *