const { Router } = require('express');
const { fileUpload,fileLoad } = require('../controlers/upload.controler');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressfileUpload = require('express-fileupload');


const router = new Router();
//Middleware para recibir el archico con la lib file de express
router.use(expressfileUpload());
router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:img', validarJWT, fileLoad);









module.exports = router;