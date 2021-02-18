const { response } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req,res = response) =>{

    const {email,password} = req.body;

    try {

        // Verificar email
        const userDB = await User.findOne({email});

        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'Credenciales Incorrectas'
            });
        }

        //Verificar pass, lo que envia y el hash en la bd
        const validPass = bcryptjs.compareSync(password, userDB.password);

        if(!validPass){
            return res.status(404).json({
                ok:false,
                msg:'Autenticación Incorrecta'
            });
        }

        //Generar un token

        const token = await generarJWT(userDB.id);

        res.json({
            ok:true,
            msg:token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte con el equipo técnico'
        });
    }
};

module.exports = {
    login,
}