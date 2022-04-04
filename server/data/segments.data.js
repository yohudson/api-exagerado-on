const database = require('../infra/system.db')

exports.getSegments = () => {
    return database.query('SELECT * FROM segments');
}

exports.getSegment = (id) => {
    return database.oneOrNone('SELECT * FROM segments WHERE segment_uuid = $1', [id]);
}

exports.getSegmentByName = (nome) => {
    return database.oneOrNone('SELECT * FROM segments WHERE nome = $1', [nome]);
}

exports.saveSegment = (segments) => {
    return database.one('INSERT INTO segments (nome) VALUES ($1) RETURNING *', [segments]);
}

exports.deleteSegment = (id) => {
    return database.none('DELETE FROM segments WHERE segment_uuid = $1', [id]);
}

exports.updateSegment = (id, segments) => {
    return database.none('UPDATE segments SET nome = $1 WHERE segment_uuid = $2', [segments, id]);
}