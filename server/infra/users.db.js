const pgp = require('pg-promise')();

const db = pgp({
    // connectionString: process.env.URL
    user: 'bltzqqmq',
    password: 'W3UKEApoSMpBb7xS-SP9yxH90grYRAdh',
    host: 'tuffi.db.elephantsql.com',
    port: 5432,
    database: 'bltzqqmq'
})

module.exports = db;