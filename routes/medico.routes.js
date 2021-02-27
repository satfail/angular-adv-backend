/*
ruta '/api/hospital
*/


/*RUTA
 /api/users
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedico,addMedico, putMedico, deleteMedico } = require('../controlers/medico.controler');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const {validarCampos} = require('../middlewares/validar.middleware');


router.get('/', getMedico);

// ruta, [arreglo de Middlewares], función
router.post(
    '/',
    [
        validarJWT,
        check('name', 'Nombre del médico no es válido').not().isEmpty(),
        check('hospital', 'El id del hospital no es válido').isMongoId(),
        validarCampos, 
    ] 
    ,addMedico);


    router.put('/:id',
    [
        validarJWT,
        check('name', 'Nombre del médico no es válido').not().isEmpty(),
        check('hospital', 'El id del hospital no es válido').isMongoId(),
        validarCampos,  
    ] 
    , putMedico);

    router.delete('/:id',validarJWT ,deleteMedico);






module.exports = router;