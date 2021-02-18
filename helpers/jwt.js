const jwt = require('jsonwebtoken');

const generarJWT = (uid) =>{
    
    return new Promise((resolve,reject) =>{
        //El payload tiene que llevar info no sensible
        //en este  caso solo el uid
        const payload = {
            uid,
        }
            ;
        jwt.sign(payload, process.env.JWT_SECRET,
            {
            expiresIn : '12h'
            }, 
            (err,token) =>{
                if (err){
                    reject('No se pudo generar el JWT');
                }else{
                    resolve(token);
                }
            });
    });
    

}

module.exports = {
    generarJWT,
}

