const pgp = require('pg-promise')(/* options */)
console.log(process.env.DATABASE_URI)
const db = pgp(process.env.DATABASE_URI)

module.exports = db