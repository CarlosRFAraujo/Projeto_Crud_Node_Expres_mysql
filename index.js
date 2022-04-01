const express = require('express')
const exphbs = require('express-handlebars')
const conexao = require('./db/conexao')

const app = express()


app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.render('home')
})

app.get('/cadastro', function (req, res) {
    res.render('cadastro')
})

app.get('/livros/:id', function(req, res) {
    const id = req.params.id
    const sqlSelect = `SELECT * FROM livros WHERE id = ${id}`

    conexao.query(sqlSelect, function (erro, data) {
        if (erro) {
            console.log(erro)
            return
        }

        const livro = data[0]

        res.render('livro', {livro})

    })
})

app.get('/livros/edicao/:id', function (req, res) {
    const id = req.params.id
    const sqlSelect = `SELECT * FROM livros WHERE id = ${id}`
    let msg;

    conexao.query(sqlSelect, function (erro, data) {
        if (erro) {
            console.log(erro)
        }

        const livro = data[0]
        msg = 'Livro alterado com sucesso!'

        res.render('editalivro', { livro, msg })
    })
})

app.get('/livros', function (req, res) {
    const sqlSelect = `SELECT * FROM livros`

    conexao.query(sqlSelect, function (erro, data) {
        if (erro) {
            console.log(erro)
        }
        const livros = data
        
        res.render('livros', { livros })                
    })
    
})

app.post('/livros/inserirlivro', function (req, res) {
    const titulo = req.body.titulo
    const paginas = req.body.paginas

    const sqlInsert = `INSERT INTO livros (titulo, paginas) VALUES ('${titulo}', '${paginas}')`

    conexao.query(sqlInsert, function(erro) {
        if (erro) {
            console.log(erro)
        }
        
        res.redirect('/cadastro')
    })
    
})

app.post('/livros/atualizarlivro', function (req, res) {
    const id = req.body.id
    const titulo = req.body.titulo
    const paginas = req.body.paginas

    const sqlUpdate = `UPDATE livros SET titulo = '${titulo}', paginas = '${paginas}' WHERE id = ${id}`

    conexao.query(sqlUpdate, function (erro, data) {
        if (erro) {
            console.log(erro)
        }

        res.redirect('/livros')
    })
})

app.post('/livros/remover/:id', function (req, res) {
    const id = req.params.id
    const sqlDelete = `DELETE FROM livros WHERE id = ${id}`

    conexao.query(sqlDelete, function (erro, data) {
        if (erro) {
            console.log(erro)
        }

        res.redirect('/livros')
    })
})

app.listen(3000)