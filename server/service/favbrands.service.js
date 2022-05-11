const brandsData = require('../data/favbrands.data');

exports.getBrands = async() => {
    const brands = await brandsData.getBrands();
    if (!brands) throw new Error('Lista de marcas favoritas não encontrada');
    return brands;
}

exports.getFavBrands = async(id) => {
    const brands = await brandsData.getFavBrands(id);
    if (!brands) throw new Error('Lista de marcas favoritas deste usuário não encontrada');
    return brands;
}

exports.saveBrands = async(brands) => {
    return brandsData.saveBrands(brands);
}