const mongoose = require('mongoose')

//script de conexão
const conexao = async()=>{
    const atlas = await mongoose.connect('mongodb+srv://userAdmin:oTTk6hkUErZPEfKt@clusteraws.wdjtf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAWS')
}

//exportar as informações para acesso externo
module.exports = conexao