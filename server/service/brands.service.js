const brandsData = require('../data/brands.data');

exports.getBrands = async() => {
    const brands = await brandsData.getBrands();
    if (!brands) throw new Error('Lista de marcas não encontrada');
    return brands;
}


exports.getBrand = async(id) => {
    const brands = await brandsData.getBrand(id);
    if (!brands) throw new Error('Marca não encontrada');
    return brands;
}

exports.saveBrand = async(brand) => {
    const existingBrand = await brandsData.getBrandByName(brand.nome);
    if (existingBrand) throw new Error('Marca já existe')
    return brandsData.saveGender(brand);
}

exports.deleteBrand = (id) => {
    return brandsData.deleteBrand(id);
}

exports.updateBrand = async(id, brand) => {
    await exports.getBrand(id)
    return brandsData.updateBrand(id, brand);
}