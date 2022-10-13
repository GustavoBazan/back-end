const mongoose = require('mongoose')

//criar a estrutura para o armazenamento das informações das mercadorias
const modelo = mongoose.Schema({
    artista:String
})

//gravar a estrutura na model usuários
const artistas = mongoose.model('artistas',modelo)

//exportar os dados para acesso externo
module.exports = artistas;