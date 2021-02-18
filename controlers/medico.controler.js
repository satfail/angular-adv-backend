const { response } = require('express');

const getMedico = (req,res = response) =>{

    res.json({
        ok:true,
        msg:'getMedico'
    });
}
const addMedico = (req,res = response) =>{

    res.json({
        ok:true,
        msg:'addMedico'
    });
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