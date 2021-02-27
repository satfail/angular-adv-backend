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
const putHospital = async (req,res = response) =>{

    const hospitalID = req.params.id;
    const uid = req.uid; //Recuerda que viene del middleware JWT
    
    try {

        const hospitalDb = await Hospital.findById(hospitalID);
        console.log(hospitalDb);
        
        if(!hospitalDb){
            res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            });
        }


        const cambiosHospital = { 
        ...req.body,
        usuario : uid,

        };

        const updateHospital = await Hospital.findByIdAndUpdate(hospitalID, cambiosHospital, {new:true})

        res.json({
            ok:true,
            updateHospital,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar'
        });
    }
}
const deleteHospital = async (req,res = response) =>{


    const hospitalID = req.params.id;
    
    try {

        const hospitalDb = await Hospital.findById(hospitalID);
        
        if(!hospitalDb){
            res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado'
            });
        }

        await Hospital.findByIdAndDelete(hospitalID);

        res.json({
            ok:true,
            msg:'Hospital borrado correctemente',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al borrar'
        });
    }
}



module.exports = {
    getHospital,
    addHospital,
    putHospital,
    deleteHospital

}