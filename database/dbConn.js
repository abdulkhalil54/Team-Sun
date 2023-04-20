const pgp = require('pg-promise')(/* options */)

//Extract variable named DATABASE_URI fron .env file.
const db = pgp(process.env.DATABASE_URI)

module.exports = {db, pgp}