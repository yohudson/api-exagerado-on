const attractionsData = require('../data/attraction.data');

exports.getAttractions = async() => {
    const attractions = await attractionsData.getAttractions();
    if (!attractions) throw new Error('Lista de atrações não encontrada');
    return attractions;
}


exports.getAttraction = async(id) => {
    const attractions = await attractionsData.getAttraction(id);
    if (!attractions) throw new Error('Atração não encontrada');
    return attractions;
}

exports.saveAttraction = async(attraction) => {
    const existingAttraction = await attractionsData.getAttractionByName(attraction.atracao_nome);
    if (existingAttraction) throw new Error('Atração já existe')
    return attractionsData.saveAttraction(attraction);
}

exports.deleteAttraction = (id) => {
    return attractionsData.deleteAttraction(id);
}

exports.updateAttraction = async(attraction) => {
    await exports.getAttraction(attraction.atracao_uuid)
    return attractionsData.updateAttraction(attraction);
}