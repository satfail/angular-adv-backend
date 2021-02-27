const { response } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google.verify');
const { findOne } = require('../models/user.model');

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


const googleSignIn = async(req,res = response) =>{

    const googleToken = req.body.token;

    try {
        const {name, email,picture} = await googleVerify(googleToken);
        
        //Comprobar que ya el usuario existe
        const userDB = await User.findOne({email});
        console.log(userDB);
        let user;

        if(!userDB){
            user = new User({
                name:name,
                email:email,
                password:'@@@',
                img:picture,
                google:true
            })
        }else{
            //existe user
            user = userDB;
            user.google = true;
        }

        //Guardar en db
        user.save();
        
        const token = await generarJWT(user.id);

        res.json({
            ok:true,
            msg:"Google Sign-in",
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg:"El token no es correcto",
            error,

        });
    }
}

module.exports = {
    login,
    googleSignIn,
}