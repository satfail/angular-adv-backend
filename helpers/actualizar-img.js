const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');
const fs = require('fs');


const actualizarImg = async (tipo, id, filename) =>{

    let pathViejo = '';
    switch (tipo) {
        case 'user':
            const user = await User.findById(id);
            console.log(user.img);
            if( !user ){
                console.log('No se encontro una id');
                return false;
            }
            //Borrar la imagen anterior
             pathViejo = `./uploads/user/${ user.img }`;
            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo);
            }
            //Guarda el path de la nueva imagen
            user.img = filename
            await user.save();
            return true
            break;
            
            break;
        case 'hospital':
            const hospital = await Hospital.findById(id);
            
            if( !hospital ){
                console.log('No se encontro una id');
                return false;
            }
            
            //Borrar la imagen anterior
             pathViejo = `./uploads/hospital/${ hospital.img }`;
            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo);
            }
            //Guarda el path de la nueva imagen
            hospital.img = filename
            await hospital.save();
            return true
            break;
        case 'medico':
            
            const medico = await Medico.findById(id);
            
            if( !medico ){
                console.log('No se encontro una id');
                return false;
            }
            //Borrar la imagen anterior
             pathViejo = `./uploads/medico/${ medico.img }`;
            if(fs.existsSync(pathViejo)){
                fs.unlinkSync(pathViejo);
            }
            //Guarda el path de la nueva imagen
            medico.img = filename
            await medico.save();
            return true
            break;
    
        default:
            break;
    }
    
}




module.exports = {
    actualizarImg,
}