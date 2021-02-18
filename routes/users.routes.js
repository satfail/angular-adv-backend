/*RUTA
 /api/users
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { addUser,getUsers,putUser,deleteUser } = require('../controlers/user.controler');
const router = Router();
const {validarCampos} = require('../middlewares/validar.middleware');


router.get('/', getUsers);

// ruta, [arreglo de Middlewares], función
router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos, //Custom middleware
    ] 
    ,addUser);


    router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('role','El rol es obligatorio').not().isEmpty(),
        validarCampos, //Custom middleware
    ] 
    , putUser);

    router.delete('/:id', deleteUser);






module.exports = router;