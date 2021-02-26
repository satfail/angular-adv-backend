const { response } = require('express');
const Medico = require('../models/medico.model');

const getMedico = async(req,res = response) =>{

        //Populate para pillar el user
    const medico =  await Medico.find()
        .populate('user', 'name img')
        .populate('hospital', 'name, img')

    res.json({
        ok:true,
        medico
    });
}
const addMedico = async (req,res = response) =>{

    const uid = req.uid;
   
    //Solo pilla el uid y el lo que venga en el body
    const medico = new Medico( { 
        user:uid,
        ...req.body
    });

    
    //Lo tiene el middleware(validar-jwt) que gestiona el JWT, se adjunto al request para estas cosas
    try {
        const medicoDb = await medico.save();
        res.json({
            ok:true,
            medicoDb
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte con el servicio técnico'
        });
    }
}
const putMedico = (req,res = response) =>{

    res.json({
        ok:true,
        msg:'putMedico'
    });
}
const deleteMedico = (req,res = response) =>{

    res.json({
        ok:true,
        msg:'deleteMedico'
    });
}



module.exports = {
    getMedico,
    addMedico,
    putMedico,
    deleteMedico

}