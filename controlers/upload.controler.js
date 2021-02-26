const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImg } = require('../helpers/actualizar-img')
const path = require('path');
const fs = require('fs');

const fileUpload = (req,res = response) =>{


    const tipo = req.params.tipo;
    const id = req.params.id;


    const tiposValidos = ['user','medico','hospital'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es medico, user, u Hospital (tipo)'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No ha seleccionado ningún archivo'
        });
      }

      //Procesar la imagen, tengo files gracias al middleware fileup de express
      const file = req.files.img

      const nombreSplit = file.name.split('.');
      const extension = nombreSplit[nombreSplit.length -1];


      //Validar extensión
      const extensionesValidas = ['png','jpg','jpeg','gif'];

      if(!extensionesValidas.includes(extension)){
          return res.json({
              ok:false,
              msg : 'No es una extensión válida'
          });
      }

      //Generar el nombre de la img mediante hash de la lib uuid
      const filename = `${ uuidv4() }.${ extension }`;

      //Path para la img
      const path = `./uploads/${ tipo }/${ filename }`;

       // Use the mv(): para mover el archivo a una parte del server
      file.mv(path, (err) => {
        if (err)
        return res.status(500).json({
            ok:false,
            msg:'Error al guardar el archivo'
        });

        //Actualizar base de datos
        actualizarImg(tipo,id,filename);
        
        
        
        res.json({
            ok:true,
            msg:'Archivo subido',
            path: path
        });
     });


}

const fileLoad = (req,res = response) =>{

    const tipo = req.params.tipo;
    const img = req.params.img;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${img}`);
    
    //imagenPorDefencto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg2 = path.join(__dirname, `../uploads/No-Image-Found-400x264.png`);
        res.sendFile(pathImg2);
    }
    
}



module.exports = {
    fileUpload,
    fileLoad,
    
    }