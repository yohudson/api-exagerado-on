const storesData = require('../data/stores.data');

exports.getStores = async() => {
    const stores = await storesData.getStores();
    if (!stores) throw new Error('Lista de lojas não encontrada');
    return stores;
}


exports.getStore = async(id) => {
    const stores = await storesData.getStore(id);
    if (!stores) throw new Error('Loja não encontrada');
    return stores;
}

exports.saveStore = async(store) => {
    const existingStore = await storesData.getStoreByCnpj(store.cnpj);
    if (existingStore) throw new Error('Loja já existe')
    return storesData.saveStore(store);
}

exports.deleteStore = (id) => {
    return storesData.deleteStore(id);
}

exports.updateStore = async(store) => {
    await exports.getStore(store.loja_uuid)
    return storesData.updateStore(store);
}