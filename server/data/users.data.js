const database = require('../infra/users.db')

exports.getUsers = () => {
    return database.query('SELECT * FROM users');
}

exports.getUser = (id) => {
    return database.oneOrNone('SELECT * FROM users WHERE user_id = $1', [id]);
}

exports.getUserByEmail = (email) => {
    return database.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
}

exports.saveUser = (user) => {
    return database.one('INSERT INTO users (nome, email) VALUES ($1, $2) RETURNING *', [user.nome, user.email]);
}

exports.deleteUser = (id) => {
    return database.none('DELETE FROM users WHERE user_id = $1', [id]);
}

exports.updateUser = (id, user) => {
    return database.none('UPDATE users SET nome = $1, email = $2 WHERE user_id = $3', [user.nome, user.email, id]);
}