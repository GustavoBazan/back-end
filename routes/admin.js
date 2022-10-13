module.exports = (app)=>{
    //importar as configurações do database
    var conexao = require('../config/database')

    //importar o modelo mygrid
    var mercadorias = require('../models/mercadorias')
    var artistas = require('../models/artistas')

    //rota admin
    app.get('/admin',(req,res)=>{
        //conecta com o database
        conexao()

        //busca todos os documentos no banco de dados
        mercadorias.find().sort({_id:-1})
        .then((mercadorias)=>{
            res.render('admin.ejs',{dados:mercadorias})
        })
        .catch(()=>{
            res.render('admin.ejs')
        })
    })

    app.post('/admin',(req,res)=>{
        //conectar com o database
        conexao()
        //gravar o documento
        var documento = new mercadorias({
            artista:req.body.artista,
            produto:req.body.produto,
            quantia:req.body.quantia,
            valor:req.body.valor
        }).save()
        .then(()=>{
            res.redirect('/admin')
        })
        .catch(()=>{
            res.send('Não foi possível gravar os dados no DB')
        })
    })

    //excluir documento da coleção atual
    app.get('/admin_excluir',async(req,res)=>{
        //recupera o id da barra de endereços
        var id = req.query.id
        //excluindo o documento da coleção
        var excluir = await mercadorias.findOneAndRemove({_id:id})
        //voltar para a página mygrid
        res.redirect('/admin')
    })

    //rota alterar
    app.get('/admin/alterar',async(req,res)=>{
        //conecta com o database
        conexao()

        // recupera o id da barra de endereços
        var id = req.query.id
        // encontra a mercadoria a ser alterado
        var alterar = await mercadorias.findOne({_id:id})

        .then((alterar)=>{
            res.render('alterar.ejs',{dados:alterar})
        })
        .catch(()=>{
            res.send("Something is wrong i can feel it")
        })
    })

    app.post('/admin/alterar',async(req,res)=>{
        conexao()
        // recuperar informações
        var infos = req.body;
        console.log(infos)
        // gravar alterações
        var alterar = await mercadorias.findOneAndUpdate(
            {_id:infos.id},
            {
                artista: infos.artista[0], 
                produto: infos.produto, 
                quantia: infos.quantia, 
                valor: infos.valor
            })
        res.redirect('/admin')
    })

    app.get('/admin/artistas',(req,res)=>{
        //conecta com o database
        conexao()

        //busca todos os documentos no banco de dados
        artistas.find().sort({_id:-1})
        .then((artistas)=>{
            res.render('artistas.ejs',{dados:mercadorias})
        })
        .catch(()=>{
            res.render('admin.ejs')
        })
    })
}