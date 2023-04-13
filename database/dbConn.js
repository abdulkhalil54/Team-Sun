const pgp = require('pg-promise')(/* options */)

const db = pgp(process.env.DATABASE_URI)

module.exports = db