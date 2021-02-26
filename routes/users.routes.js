/*RUTA
 /api/users
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { addUser,getUsers,putUser,deleteUser } = require('../controlers/user.controler');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();
const {validarCampos} = require('../middlewares/validar.middleware');


router.get('/',validarJWT, getUsers);

// ruta, [arreglo de Middlewares], función
router.post(
    '/',
    [
        validarJWT, //Mejor al pricipio si no hay token no hago el resto
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos, //Custom middleware
    ] 
    ,addUser);


    router.put('/:id',
    [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('role','El rol es obligatorio').not().isEmpty(),
        validarCampos, //Custom middleware
    ] 
    , putUser);

    router.delete('/:id',validarJWT, deleteUser);


    



module.exports = router;