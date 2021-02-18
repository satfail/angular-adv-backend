const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next) =>{

    const token = req.header('x-token');

    //console.log(token);
    
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        // ruta -> middleware pone el uid si es correcto -> método ejecutado en la ruta
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token incorrecto'
        });
    } 
    
}



module.exports = {
    validarJWT,

}