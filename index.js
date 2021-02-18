const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Crear el server express
const app = express();

//Configurar cors - Middlewares para las peticiones
app.use(cors());

dbConnection();
app.get('/', (req,res) => {

    res.json({
        ok:true,
        msg:"Hola mundo!"
    })
});

app.listen(process.env.PORT, () =>{
    console.log('Servidor levantado en el puerto ' + process.env.PORT)
})