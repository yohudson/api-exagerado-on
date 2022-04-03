const database = require('../infra/system.db')

exports.getBrands = () => {
    return database.query('SELECT * FROM brands');
}

exports.getBrand = (id) => {
    return database.oneOrNone('SELECT * FROM brands WHERE marca_uuid = $1', [id]);
}

exports.getBrandByName = (nome) => {
    return database.oneOrNone('SELECT * FROM brands WHERE nome = $1', [nome]);
}

exports.saveBrand = (brand) => {
    return database.one(`INSERT INTO brands (nome,segmento_uuid) VALUES ($1,$2) RETURNING *`, [brand.nome, brand.segmento_uuid]);
}

exports.deleteBrand = (id) => {
    return database.none('DELETE FROM brand WHERE marca_uuid = $1', [id]);
}

exports.updateBrand = (id, brand) => {
    return database.none(`UPDATE quiz SET nome = $1, segmento = $2 WHERE marca_uuid = $3`, [brand.nome, brand.segmento, id]);
}