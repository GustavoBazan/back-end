const express = require("express");

const app = express()

//define a porta do servidor
const porta = process.env.PORT || 5050

//define a pasta dos arquivos estaticos (css, imagens, jquery)
app.use(express.static('./assets'))

//definir o express como body parse
app.use(express.urlencoded({extended:false}))

//exportar o conteúdo
module.exports = {app,porta}