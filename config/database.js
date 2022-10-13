const mongoose = require('mongoose')

//script de conexão
const conexao = async()=>{
    const atlas = await mongoose.connect('mongodb+srv://admin:admin1234@cluster0.qbuo2xv.mongodb.net/merchstore')
}

//exportar as informações para acesso externo
module.exports = conexao