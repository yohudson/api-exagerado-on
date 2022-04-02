const database = require('../infra/users.db')

exports.getGenders = () => {
    return database.query('SELECT * FROM genders');
}

exports.getGender = (id) => {
    return database.oneOrNone('SELECT * FROM genders WHERE genero_id = $1', [id]);
}

exports.getGenderByName = (nome) => {
    return database.oneOrNone('SELECT * FROM genders WHERE nome = $1', [nome]);
}

exports.saveGender = (gender) => {
    return database.one('INSERT INTO genders (nome) VALUES ($1) RETURNING *', [gender]);
}

exports.deleteGender = (id) => {
    return database.none('DELETE FROM genders WHERE genero_id = $1', [id]);
}

exports.updateGender = (id, gender) => {
    return database.none('UPDATE genders SET nome = $1 WHERE genero_id = $2', [gender, id]);
}