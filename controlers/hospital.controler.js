const { response } = require('express');
const Hospital = require('../models/hospital.model');


const getHospital = async (req,res = response) =>{

    //Populate para pillar el user
    const hospitales =  await Hospital.find()
        .populate('user', 'name img');

    res.json({
        ok:true,
        hospitales
    });
}
const addHospital = async (req,res = response) =>{

    const uid = req.uid;
   
    //Solo pilla el uid y el lo que venga en el body
    const hospital = new Hospital( { 
        user:uid,
        ...req.body
    });

    
    //Lo tiene el middleware(validar-jwt) que gestiona el JWT, se adjunto al request para estas cosas
    try {
        const hospitalDb = await hospital.save();
        res.json({
            ok:true,
            hospitalDb
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte con el servicio técnico'
        });
    }


}
const putHospital = (req,res = response) =>{

    res.json({
        ok:true,
        msg:'putHospital'
    });
}
const deleteHospital = (req,res = response) =>{

    res.json({
        ok:true,
        msg:'deleteHospital'
    });
}



module.exports = {
    getHospital,
    addHospital,
    putHospital,
    deleteHospital

}