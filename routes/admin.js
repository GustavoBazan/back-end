    // importar os pacotes
    var multer = require('multer')
    var fs = require('fs')

module.exports = (app)=>{
    //importar as configurações
    var conexao = require('../config/database')
    var upload = require('../config/upload')

    //importar os modelos
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

        //importar as configurações do upload
        var upload = require('../config/upload')
        //fazer o upload da imagem na pasta de destino
        app.post('/admin',(req,res)=>{
    
            //executar o upload da imagem
            upload(req, res, async(err) => {
                if (err instanceof multer.MulterError) {
                    res.render('erros.ejs',{erro:"Arquivo maior que o limite!"})
                    //res.send('Arquivo maior que o limite!')
                } else if (err) {
                    res.render('erros.ejs',{erro:"Tipo de arquivo inválido"})
                    //res.send("Tipo de arquivo inválido")
                } else {
                    //conectar com o databaase
                    conexao()
                    //gravar as informações na collection mercadorias
                    var arquivo = await new mercadorias({
                            artista:req.body.artista,
                            produto:req.body.produto,
                            quantia:req.body.quantia,
                            valor:req.body.valor,
                            imagem:req.file.filename
                        }).save()
                    //apos o upload voltar para o formulario
                    res.redirect('/admin')
                }
            })
        })

    //excluir documento da coleção atual
    app.get('/admin/excluir',async(req,res)=>{
        //recupera o id da barra de endereços
        var id = req.query.id
        //excluindo o documento da coleção
        var excluir = await mercadorias.findOneAndRemove({_id:id})
        //excluir a imagem da pasta uploads
        fs.unlinkSync('./assets/images/uploads/'+ excluir.imagem)
        //voltar para a página mygrid
        res.redirect('/admin')
    })

    //rota alterar
    app.get('/admin/alterar',async(req,res)=>{
        // conecta com o database
        conexao()
        // busca o documento no banco de dados
        const alterar = mercadorias.findOne({_id:req.query.id})
        .then((alterar)=>{
            res.render('alterar.ejs',{dados:alterar})
        })
        .catch(()=>{
            res.send('Erro')
        })
    })

    app.post('/admin/alterar',async(req,res)=>{
        //executar o upload da imagem
        upload(req, res, async(err) => {
            if (err instanceof multer.MulterError) {
                res.render('erros.ejs',{erro:"Arquivo maior que o limite!"})
                //res.send('Arquivo maior que o limite!')
            } else if (err) {
                res.render('erros.ejs',{erro:"Tipo de arquivo inválido"})
                //res.send("Tipo de arquivo inválido")
            } else {
                //conectar com o databaase
                conexao()

                if (req.file.filename == undefined) {
                    updatedImage = req.body.original
                } else {
                    updatedImage = req.file.filename
                    //excluir a imagem da pasta uploads
                    fs.unlinkSync('./assets/images/uploads/'+ req.body.original)
                }
                //gravar as informações na collection mercadorias
                var arquivo = await mercadorias.findOneAndUpdate(
                    {id:req.query.id},
                    {
                        artista:req.body.artista[0],
                        produto:req.body.produto,
                        quantia:req.body.quantia,
                        valor:req.body.valor,
                        imagem:updatedImage
                    })
                console.log(req.body)
                //apos o upload voltar para o formulario
                res.redirect('/admin')
            }
        })
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