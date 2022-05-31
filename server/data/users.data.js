const database = require('../infra/system.db')

exports.getUsers = () => {
    return database.query('SELECT * FROM users');
}

exports.getUser = (id) => {
    return database.oneOrNone('SELECT * FROM users WHERE user_uuid = $1', [id]);
}

exports.getUserByEmail = (email) => {
    return database.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
}

exports.saveUser = (user) => {
    return database.one('INSERT INTO users (nome, telefone, email, data_nascimento, genero, senha, cad_google) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [user.nome, user.telefone, user.email, user.data_nascimento, user.genero, user.senha, user.cad_google]);
}

exports.deleteUser = (id) => {
    return database.none('DELETE FROM users WHERE user_uuid = $1', [id]);
}

exports.updateUser = (user) => {
    return database.none('UPDATE users SET nome = $1, telefone = $2, email = $3, data_nascimento = $4, genero = $5, senha = $6 WHERE user_uuid = $7', [user.nome, user.telefone, user.email, user.data_nascimento, user.genero, user.senha, user.user_uuid]);
}