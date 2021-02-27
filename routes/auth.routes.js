

/* Path : 'api/login' */
const { Router } = require('express');
const {login, googleSignIn} = require('../controlers/auth.controler');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar.middleware');

const router = Router();

router.post('/',
[
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos, //Custom middleware
],
login
)


router.post('/google',
[
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos, //Custom middleware
],
googleSignIn
)


module.exports = router;