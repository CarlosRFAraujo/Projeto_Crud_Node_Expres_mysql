const mysql = require('mysql')

const conexao = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'uselivro',
    password: '',
    database: 'nodemysql',
})

module.exports = conexao