const crypto = require('crypto');
const axios = require('axios');
const userService = require('../service/users.service');
const genderService = require('../service/genders.service');

const generate = (val) => {
    return crypto.randomBytes(val).toString('hex');
}

const request = (url, method, data) => {
    return axios({ url, method, data, validateStatus: false })
}

//usuarios
test('should get users', async() => {
    const user1 = await userService.saveUser({ nome: generate(3), telefone: generate(3), email: generate(3), data_nascimento: '1989-04-22', genero: '1', senha: generate(3) })
    const user2 = await userService.saveUser({ nome: generate(3), telefone: generate(3), email: generate(3), data_nascimento: '1989-04-22', genero: '1', senha: generate(3) })
    const response = await request('http://localhost:3000/users', 'GET');
    expect(response.status).toBe(200);
    const users = response.data;
    expect(users).toHaveLength(2)
    await userService.deleteUser(user1.user_uuid)
    await userService.deleteUser(user2.user_uuid)
})

test('should save new users', async() => {
    const user = { user_uuid: generate(3), nome: generate(3), telefone: generate(3), email: generate(3), data_nascimento: '1989-04-22', genero: '1', senha: generate(3) };
    const response = await request('http://localhost:3000/users', 'POST', user);
    expect(response.status).toBe(201);
    const users = response.data;
    expect(users.nome).toBe(user.nome);
    expect(users.email).toBe(user.email);
    await userService.deleteUser(users.user_uuid);
})

test('should not save new users', async() => {
    const user = { user_uuid: generate(3), nome: generate(3), telefone: generate(3), email: generate(3), data_nascimento: '1989-04-22', genero: '1', senha: generate(3) };
    const response1 = await request('http://localhost:3000/users', 'POST', user);
    const response2 = await request('http://localhost:3000/users', 'POST', user);
    expect(response2.status).toBe(409);
    const users = response1.data;
    await userService.deleteUser(users.user_uuid);
})

test('should update an user', async() => {
    const user = await userService.saveUser({ user_uuid: generate(3), nome: generate(3), telefone: generate(3), email: generate(3), data_nascimento: '1989-04-22', genero: '1', senha: generate(3) });
    user.nome = generate(3);
    user.telefone = generate(3);
    user.email = generate(3);
    user.senha = generate(3);
    const response = await request(`http://localhost:3000/users/${user.user_uuid}`, 'PUT', user);
    expect(response.status).toBe(204)
    const updateUser = await userService.getUser(user.user_uuid)
    expect(updateUser.nome).toBe(user.nome);
    expect(updateUser.email).toBe(user.email);
    await userService.deleteUser(updateUser.user_uuid);
})

test('should not update an user', async() => {
    const user = { user_uuid: 1 };
    const response = await request(`http://localhost:3000/users/${user.user_uuid}`, 'PUT', user);
    expect(response.status).toBe(404)
})

test('should delete an user', async() => {
    const user = await userService.saveUser({ user_uuid: generate(3), nome: generate(3), telefone: generate(3), email: generate(3), data_nascimento: '1989-04-22', genero: '1', senha: generate(3) });
    const response = await request(`http://localhost:3000/users/${user.user_uuid}`, 'DELETE');
    expect(response.status).toBe(204)
    const users = await userService.getUsers();
    expect(users).toHaveLength(0);
})

//gêneros
test('should save and get genders', async() => {
    const gender1 = await genderService.saveGender({ nome: generate(1) })
    const gender2 = await genderService.saveGender({ nome: generate(1) })
    const response = await request('http://localhost:3000/genders', 'GET');
    expect(response.status).toBe(200);
    const genders = response.data;
    expect(genders).toHaveLength(2)
    await genderService.deleteGender(gender1.genero_id)
    await genderService.deleteGender(gender2.genero_id)
})

test('should save new gender', async() => {
    const gender = { nome: generate(2) };
    const response = await request('http://localhost:3000/genders', 'POST', gender);
    expect(response.status).toBe(201);
    const genders = response.data;
    expect(genders.nome).toBe(gender.nome);
    await genderService.deleteGender(genders.genero_id);
})

test('should not save new genders', async() => {
    const gender = { nome: generate(2) };
    const response1 = await request('http://localhost:3000/genders', 'POST', gender);
    const response2 = await request('http://localhost:3000/genders', 'POST', gender);
    expect(response2.status).toBe(409);
    const genders = response1.data;
    await genderService.deleteGender(genders.genero_id);
})

test('should update an gender', async() => {
    const gender = await genderService.saveGender({ nome: generate(1) });
    gender.nome = generate(3);
    const response = await request(`http://localhost:3000/gender/${gender.genero_id}`, 'PUT', gender);
    expect(response.status).toBe(204)
    const updateGender = await genderService.getGender(gender.genero_id)
    expect(updateGender.nome).toBe(gender.nome);
    await genderService.deleteGender(updateGender.genero_id);
})

test('should not update a gender', async() => {
    const gender = { genero_id: 1 };
    const response = await request(`http://localhost:3000/gender/${gender.genero_id}`, 'PUT', gender);
    expect(response.status).toBe(404)
})

test('should delete a gender', async() => {
    const gender = await genderService.saveGender({ nome: generate(2) });
    const response = await request(`http://localhost:3000/gender/${gender.genero_id}`, 'DELETE');
    expect(response.status).toBe(204)
    const genders = await genderService.getGenders();
    expect(genders).toHaveLength(0);
})