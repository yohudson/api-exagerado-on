const database = require('../infra/system.db')

exports.getStores = () => {
    return database.query('SELECT * FROM stores ORDER BY loja_nome ASC');
}

exports.getStore = (id) => {
    return database.oneOrNone('SELECT * FROM stores WHERE loja_uuid = $1', [id]);
}

exports.getStoreByName = (nome) => {
    return database.oneOrNone('SELECT * FROM stores WHERE nome = $1', [nome]);
}

exports.getStoreByCnpj = (cnpj) => {
    return database.oneOrNone('SELECT * FROM stores WHERE loja_cnpj = $1', [cnpj]);
}

exports.saveStore = (store) => {
    return database.one(`INSERT INTO stores(loja_nome,loja_cnpj,lista_segmentos,marcas_vendidas,nome_responsavel,telefone_contato,email_contato,status,localizacao) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`, [store.nome_loja, store.cnpj, store.segmentos, store.marcas_vendidas, store.nome_responsavel, store.telefone_contato, store.email_contato, store.status, store.localizacao]);
}

exports.deleteStore = (id) => {
    return database.none('DELETE FROM stores WHERE loja_uuid = $1', [id]);
}

exports.updateStore = (store) => {
    return database.none(`UPDATE stores SET loja_nome = $1, loja_cnpj = $2, lista_segmentos = $3, marcas_vendidas = $4, nome_responsavel = $5, telefone_contato = $6, email_contato = $7, status = $8, localizacao = $10 WHERE loja_uuid = $9`, [store.nome_loja, store.cnpj, store.segmentos, store.marcas_vendidas, store.nome_responsavel, store.telefone_contato, store.email_contato, store.status, store.loja_uuid, store.localizacao]);
}

exports.updateStoreStatus = (store) => {
    return database.none(`UPDATE stores SET status = $1 WHERE loja_uuid = $2`, [store.status, store.loja_uuid]);
}