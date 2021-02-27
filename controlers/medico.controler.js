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
const putMedico = async (req,res = response) =>{
    
    const medicoID = req.params.id;
    const uid = req.uid; //Recuerda que viene del middleware JWT
    
    try {

        const medicoDb = await Medico.findById(medicoID);
        console.log(medicoDb);
        
        if(!medicoDb){
            res.status(404).json({
                ok:false,
                msg:'Medico no encontrado'
            });
        }


        const cambiosMedico = { 
        ...req.body,
        usuario : uid,
            
        };

        const updateMedico = await Medico.findByIdAndUpdate(medicoID, cambiosMedico, {new:true})

        res.json({
            ok:true,
            updateMedico: updateMedico,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al actualizar'
        });
    }
}
const deleteMedico = async (req,res = response) =>{
    
    const medicoID = req.params.id;
    try {

        const medicoDb = await Medico.findById(medicoID);
        console.log(medicoDb);
        
        if(!medicoDb){
            res.status(404).json({
                ok:false,
                msg:'Medico no encontrado'
            });
        }
        
        await Medico.findByIdAndDelete(medicoID);

        res.json({
            ok:true,
            msg:'Medico borrado Correctamente'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al Borrar'
        });
    }
}



module.exports = {
    getMedico,
    addMedico,
    putMedico,
    deleteMedico,

}