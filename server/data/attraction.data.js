const database = require('../infra/system.db')

exports.getAttractions = () => {
    return database.query('SELECT * FROM attractions');
}

exports.getAttraction = (id) => {
    return database.oneOrNone('SELECT * FROM attractions WHERE atracao_uuid = $1', [id]);
}

exports.getAttractionByName = (nome) => {
    return database.oneOrNone('SELECT * FROM attractions WHERE atracao_nome = $1', [nome]);
}

exports.saveAttraction = (attraction) => {
    console.log(attraction)
    return database.one(`INSERT INTO attractions(atracao_nome,nome_contato,telefone_contato,email_contato,status) VALUES ($1,$2,$3,$4,$5) RETURNING *`, [attraction.atracao_nome, attraction.nome_contato, attraction.telefone_contato, attraction.email_contato, attraction.status]);
}

exports.deleteAttraction = (id) => {
    return database.none('DELETE FROM attractions WHERE atracao_uuid = $1', [id]);
}

exports.updateAttraction = (attraction) => {
    console.log(attraction)
    return database.none(`UPDATE attractions SET atracao_nome = $1,nome_contato = $2, telefone_contato = $3, email_contato = $4, status = $5 WHERE atracao_uuid = $6`, [attraction.atracao_nome, attraction.nome_contato, attraction.telefone_contato, attraction.email_contato, attraction.status, attraction.atracao_uuid]);
}

exports.updateAttractionStatus = (attraction) => {
    return database.none(`UPDATE attractions SET status = $1 WHERE atracao_uuid = $2`, [attraction.status, attraction.atracao_uuid]);
}