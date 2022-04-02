const crypto = require('crypto');
const axios = require('axios');
const userService = require('../service/users.service')

const generate = (val) => {
    return crypto.randomBytes(val).toString('hex');
}

const request = (url, method, data) => {
    return axios({ url, method, data, validateStatus: false })
}

test('should get users', async() => {
    const user1 = await userService.saveUser({ nome: generate(3), email: generate(3) })
    const user2 = await userService.saveUser({ nome: generate(3), email: generate(3) })
    const response = await request('http://localhost:3000/users', 'GET');
    expect(response.status).toBe(200);
    const users = response.data;
    expect(users).toHaveLength(2)
    await userService.deleteUser(user1.user_id)
    await userService.deleteUser(user2.user_id)
})

test('should save new users', async() => {
    const user = { nome: generate(3), email: generate(3) };
    const response = await request('http://localhost:3000/users', 'POST', user);
    expect(response.status).toBe(201);
    const users = response.data;
    expect(users.nome).toBe(user.nome);
    expect(users.email).toBe(user.email);
    await userService.deleteUser(users.user_id);
})

test('should not save new users', async() => {
    const user = { nome: generate(3), email: generate(3) };
    const response1 = await request('http://localhost:3000/users', 'POST', user);
    const response2 = await request('http://localhost:3000/users', 'POST', user);
    expect(response2.status).toBe(409);
    const users = response1.data;
    await userService.deleteUser(users.user_id);
})

test('should update an user', async() => {
    const user = await userService.saveUser({ nome: generate(3), email: generate(3) });
    user.nome = generate(3);
    user.email = generate(3);
    const response = await request(`http://localhost:3000/users/${user.user_id}`, 'PUT', user);
    expect(response.status).toBe(204)
    const updateUser = await userService.getUser(user.user_id)
    expect(updateUser.nome).toBe(user.nome);
    expect(updateUser.email).toBe(user.email);
    await userService.deleteUser(updateUser.user_id);
})

test('should not update an user', async() => {
    const user = { id: 1 };
    const response = await request(`http://localhost:3000/users/${user.user_id}`, 'PUT', user);
    expect(response.status).toBe(404)
})

test('should delete an user', async() => {
    const user = await userService.saveUser({ nome: generate(3), email: generate(3) });
    const response = await request(`http://localhost:3000/users/${user.user_id}`, 'DELETE');
    expect(response.status).toBe(204)
    const users = await userService.getUsers();
    expect(users).toHaveLength(0);
})