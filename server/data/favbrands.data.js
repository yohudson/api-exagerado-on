const database = require('../infra/system.db')

exports.getBrands = (id) => {
    return database.query('SELECT * FROM favbrands WHERE fav_uuid = $1', [id]);
}

exports.saveBrands = (brands) => {
    return database.one(`INSERT INTO favbrands (lista_favoritos,user_uuid) VALUES ($1,$2) RETURNING *`, [brands.lista_marcas, brands.user_uuid]);
}