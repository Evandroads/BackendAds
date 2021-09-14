const express = require('express')
require('dotenv').config() //Carrega as váriaveis de ambiente
const InicializaMongoServer = require('./config/db')
const rotasCategorias = require('./routes/Categoria')

InicializaMongoServer() //Inicializamos o MongoDb
const app = express()

app.use(express.json()) //definimos que o server fará o parse JSON

const PORT = process.env.PORT
//Definimos a primeira rota do nosso servidor
app.get("/",(req, res) => {
    res.json({
        mensagem: 'API 100% funcional!',
        versao: '1.0.0'
    })
})
//Rotas do app
app.use("/categorias", rotasCategorias)

//Rota para tratar erros 404
app.use(function(req, res){
    res.status(404).json({
        mensagem: 'A rota ${req.originalUrl} não existe!'
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Servidor Web rodando na porta ${PORT}`)
})