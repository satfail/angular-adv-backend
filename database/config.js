const mongoose = require('mongoose');
require('dotenv').config();


//Hago la promesa síncrona, resuelve una promesa
const dbConnection = async () =>{
    //Hago esta parte sícrona
    try {
        
        await mongoose.connect(process.env.DB_CNN, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        //Como hemos realizado la operación atómica con el await se verá despues el log
        console.log('Db online');
        
    } catch (error) {
        console.log('Error a la hora de iniciar la base de datos')
    }
    

}

module.exports ={
    dbConnection
}