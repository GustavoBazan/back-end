const multer = require('multer')

//configura o padrão de armazenamento
const armazenamento = multer.diskStorage(
    //define a pasta de destino
    {
        destination:(req,file,cb)=>{
            cb(null,'./assets/images/uploads/')
        },
        //define o padrão para os nomes dos arquivos
        filename:(req,file,cb)=>{
            cb(null,Date.now()+file.originalname)
        }
    }
)

//define o tamanho máximo em kb
var tamanho = 100 * 1024

var upload = multer({
    storage:armazenamento,
    limits:{fileSize:tamanho},
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Tipo de arquivo inválido'))
        }
    }
}).single('imagem')

module.exports = upload