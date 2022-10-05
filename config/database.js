const mongoose = require('mongoose')

//script de conexão
const conexao = async()=>{
    const atlas = await mongoose.connect('mongodb+srv://<username>:<password>@fiaptecnico.wdjtf.mongodb.net/merchstore')
}

//exportar as informações para acesso externo
module.exports = conexao