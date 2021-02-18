

/* Path : 'api/login' */
const { Router } = require('express');
const {login} = require('../controlers/auth.controler');
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


module.exports = router;