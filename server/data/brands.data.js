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
    console.log(brand)
    return database.one(`INSERT INTO brands (nome,segmento_uuid,lista_segmento_uuid,status) VALUES ($1,$2,$3,$4) RETURNING *`, [brand.nome, brand.segmento, brand.lista_segmentos, brand.status]);
}

exports.deleteBrand = (id) => {
    return database.none('DELETE FROM brands WHERE marca_uuid = $1', [id]);
}

exports.updateBrand = (id, brand) => {
    return database.none(`UPDATE brands SET nome = $1, segmento_uuid = $2, status = $3, lista_segmento_uuid = $4 WHERE marca_uuid = $5`, [brand.nome, brand.segmento, brand.status, brand.lista_segmentos, id]);
}