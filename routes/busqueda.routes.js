const { Router } = require('express');
const { getTodo, getColeccion } = require('../controlers/busqueda.controler');
const { validarJWT } = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar.middleware');


const router = new Router();

router.get('/:busqueda', validarJWT,getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getColeccion);









module.exports = router;