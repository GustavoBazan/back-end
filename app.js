const servidor = require('./config/servidor')
const consign = require('consign')

const app = servidor.app
const porta = servidor.porta

//configura o consign para incluir a rotas da pasta routes
consign().include('./routes').into(app)

app.listen(porta)