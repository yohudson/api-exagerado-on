const brandsData = require('../data/favbrands.data');

exports.getBrands = async() => {
    const brands = await brandsData.getBrands();
    if (!brands) throw new Error('Lista de marcas favoritas não encontrada');
    return brands;
}

exports.saveBrands = async(brands) => {
    console.log('serviço')
    console.log(brands)
    return brandsData.saveBrands(brands);
}