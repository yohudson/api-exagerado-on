const database = require('../infra/system.db')

exports.getSegments = () => {
    return database.query('SELECT * FROM segments');
}

exports.getSegment = (id) => {
    return database.oneOrNone('SELECT * FROM segments WHERE segmento_uuid = $1', [id]);
}

exports.getSegmentByName = (nome) => {
    return database.oneOrNone('SELECT * FROM segments WHERE nome = $1', [nome]);
}

exports.saveSegment = (segments) => {
    return database.one('INSERT INTO segments (nome,status) VALUES ($1,$2) RETURNING *', [segments.nome, segments.status]);
}

exports.deleteSegment = (id) => {
    return database.none('DELETE FROM segments WHERE segmento_uuid = $1', [id]);
}

exports.updateSegment = (id, segments) => {
    return database.none('UPDATE segments SET nome = $1, status = $2 WHERE segmento_uuid = $3', [segments.nome, segments.status, id]);
}