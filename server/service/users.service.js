const usersData = require('../data/users.data');

exports.getUsers = async() => {
    const users = await usersData.getUsers();
    if (!users) throw new Error('Usuários não encontrados');
    return users;
}

exports.getUser = async(id) => {
    const user = await usersData.getUser(id);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
}

exports.getUserByEmail = async(email) => {
    const user = await usersData.getUserByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
}

exports.saveUser = async(user) => {
    const existingUser = await usersData.getUserByEmail(user.email);
    if (existingUser) throw new Error('Usuário já existe')
    return usersData.saveUser(user);
}

exports.deleteUser = (id) => {
    return usersData.deleteUser(id);
}

exports.updateUser = async(id, user) => {
    await exports.getUser(id)
    return usersData.updateUser(id, user);
}