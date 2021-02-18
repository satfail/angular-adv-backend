const { response } = require('express');
const User = require("../models/user.model");
const bcryptjs = require('bcryptjs');


const getUsers = async (req,res) => {

const usuarios = await User.find({},'name email role google');
res.json({
    ok:true,
    usuarios
})
}
const addUser = async (req,res = response) => {

const{email, password } = req.body;



try {

    const user = new User(req.body);
    const isEmail = await User.findOne({ email });

    if(isEmail){
        return res.status(400).json({
            ok:false,
            msg: 'El correo ya existe'
        });
    }

    
    //Encriptar contraseña

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    //Espera que salve y luego mandamos respuesta
    await user.save();
    
    res.json({
        ok:true,
        user
    })
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: 'Error inesperado, consulte los logs'
    })
}
}


const putUser = async (req, res = response) =>{

// TODO: Validar token y ver si el user es correcto

const uid = req.params.id;

try {
    const userDb = await User.findById(uid);

    if(!userDb){
        return res.status(404).json({
            ok:false,
            msg: "El usuario no existe"
        });
    }

    //Actualizaciones

    const {password,google, email, ...campos} = req.body;


    //Verificar si hay otro email igual
    
    if(userDb.email !== email){

        const isEmail = await User.findOne({email});
        if(isEmail){
            return res.status(400).json({
                ok:false,
                msg: 'Existe un usuario con ese email'
             });   
        }
    }
    campos.email = email;
    //new : true para que mande el nuevo updateado
    const newUser = await User.findByIdAndUpdate(uid, campos, {new : true});

    res.json({
        ok:true,
        update: newUser
    });
    
} catch (error) {
    console.log(error),
    res.status(500).json({
        ok:false,
        msg: 'Error inesperado'
    });
}
}


const deleteUser = async (req, res = response) =>{

    uid = req.params.id;
    
    try {

        const userDb = await User.findById(uid);

        if(!userDb){
            return res.status(404).json({
                ok:false,
                msg: "El usuario no existe"
            });
        }

        await User.findByIdAndDelete(uid);
        
        res.json({
            ok:true,
            delete: 'Usuario eliminado',
            id: uid
    
        });
        
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
    
}





module.exports = {
getUsers,
addUser,
putUser,
deleteUser,

}