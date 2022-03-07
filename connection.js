const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "alen123@",
    database: "postgres"
})

module.exports = client