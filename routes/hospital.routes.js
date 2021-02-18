/*
ruta '/api/hospital
*/


/*RUTA
 /api/users
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { getHospital,addHospital, putHospital, deleteHospital } = require('../controlers/hospital.controler');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const {validarCampos} = require('../middlewares/validar.middleware');


router.get('/',validarJWT, getHospital);

// ruta, [arreglo de Middlewares], función
router.post(
    '/',
    [
        validarJWT,
        check('name', 'Nombre del hospital no es válido').not().isEmpty(),
        validarCampos,
    ] 
    ,addHospital);


    router.put('/:id',
    [
        
    ] 
    , putHospital);

    router.delete('/:id', deleteHospital);






module.exports = router;