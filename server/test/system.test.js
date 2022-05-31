const crypto = require('crypto');
const axios = require('axios');
const userService = require('../service/users.service');
const brandService = require('../service/brands.service');
const storeService = require('../service/stores.service');

const generate = (val) => {
    return crypto.randomBytes(val).toString('hex');
}

const request = (url, method, data) => {
    return axios({ url, method, data, validateStatus: false })
}

//usuario
test('criar, atualizar e apagar usuário', async() => {
    const user = { nome: generate(3), telefone: generate(4), email: generate(3), data_nascimento: '1989-04-22', genero: '15', senha: generate(3), cad_google: false };
    const response = await userService.saveUser(user);
    expect(response.status).toBe(true);
    const returnUser = response;
    returnUser.nome = generate(3);
    returnUser.telefone = generate(4);
    returnUser.email = generate(3);
    returnUser.senha = generate(3);
    const responseUpdt = await userService.updateUser(returnUser.user_uuid, returnUser);
    const updatedUser = await userService.getUser(returnUser.user_uuid)
    expect(updatedUser.nome).toBe(returnUser.nome);
    expect(updatedUser.email).toBe(returnUser.email);
    await userService.deleteUser(updatedUser.user_uuid);
})

//marca
test('criar, atualizar e apagar marca', async() => {
    const brand = { nome: generate(3), segmento_uuid: generate(3), lista_segmento_uuid: generate(3), status: true };
    const response = await brandService.saveBrand(brand)
    const returnedBrand = response;
    returnedBrand.nome = generate(3)
    returnedBrand.segmento_uuid = generate(3)
    const responseUpdt = await brandService.updateBrand(returnedBrand.marca_uuid, returnedBrand);
    const updatedBrand = await brandService.getBrand(returnedBrand.marca_uuid)
    await brandService.deleteBrand(returnedBrand.marca_uuid)
})

//loja
test('criar, atualizar e apagar loja', async() => {
    const store = { nome_loja: generate(4), cnpj: generate(4), segmentos: [generate(3)], marcas_vendidas: [generate(6)], nome_responsavel: generate(3), telefone_contato: '27981185276', email_contato: generate(3), status: true, localizacao: generate(2) };
    const response = await storeService.saveStore(store)
    const returnedStore = response;
    returnedStore.cnpj = returnedStore.loja_cnpj
    returnedStore.nome_loja = generate(3)
    returnedStore.localizacao = generate(2)
    const responseUpdt = await storeService.updateStore(returnedStore);
    const updatedStore = await storeService.getStore(returnedStore.loja_uuid)
    await storeService.deleteStore(returnedStore.loja_uuid)
})