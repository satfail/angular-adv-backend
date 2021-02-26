const { response } = require('express');
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');


const getTodo = async(req,res = response) =>{

    const busqueda = req.params.busqueda;
    
    //Hago que sea insensible la búsqueda
    const regex = new RegExp(busqueda, 'i');
    
    // const users = await User.find({name : regex })
    
    // const hospital = await Hospital.find({name : regex })
    
    // const medico = await Medico.find({name : regex })

    const [users, hospital, medico] = await Promise.all(
        [
            User.find({name : regex }),
            Hospital.find({name : regex }),
            Medico.find({name : regex })
        ]
    );


    res.json({
        ok:true,
        msg:'Ok',
        users,
        hospital,
        medico
    });   
}
const getColeccion = async(req,res = response) =>{

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    
    switch (tabla) {
        case 'users':
          data = await User.find({name : regex });
                            
            break;
        case 'hospital':
            data = await Hospital.find({name : regex })
                                .populate('user','name');
            break;
        case 'medico':
            data = await Medico.find({name : regex })
                                .populate('user','name')
                                .populate('Hospital','name');
            break;
    
        default:
            res.status(400).json({
                ok:false,
                msg:'La tabla es incorrecta'
            })
            break;

        
    }
    
    res.json({
        ok:true,
        msg:'Ok',
        resultados:data,
    });   
}










module.exports = {
    getTodo,
    getColeccion,

}

