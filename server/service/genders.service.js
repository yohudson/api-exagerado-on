const gendersData = require('../data/genders.data');

exports.getGenders = async() => {
    const genders = await gendersData.getGenders();
    if (!genders) throw new Error('Gêneros não encontrados');
    return genders;
}

exports.getGender = async(id) => {
    const gender = await gendersData.getGender(id);
    if (!gender) throw new Error('Gênero não encontrado');
    return gender;
}

exports.saveGender = async(gender) => {
    const existingGender = await gendersData.getGenderByName(gender.nome);
    if (existingGender) throw new Error('Gênero já existe')
    return gendersData.saveGender(gender.nome);
}

exports.deleteGender = (id) => {
    return gendersData.deleteGender(id);
}

exports.updateGender = async(id, gender) => {
    await exports.getGender(id)
    return gendersData.updateGender(id, gender.nome);
}