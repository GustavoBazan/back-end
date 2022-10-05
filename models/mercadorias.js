const mongoose = require('mongoose')

//criar a estrutura para o armazenamento das informações das mercadorias
const modelo = mongoose.Schema({
    artista:String,
    produto:String,
    quantia:String,
    valor:String,
    status:{type:Number,default:0}
})

//gravar a estrutura na model usuários
const mercadorias = mongoose.model('mercadorias',modelo)

//exportar os dados para acesso externo
module.exports = mercadorias