const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

/*El orden importa, sobre todo con los middlewares*/ 
//1-Crear el server express
const app = express();

//2-Configurar cors - Middlewares para las peticiones
app.use(cors());

//3-Conexión BBDD
dbConnection();

//4**-Lectura y parseo del body
app.use(express.json());


//5-Rutas
//Cualquier cosa que pase por esa url va a las rutas
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospital', require('./routes/hospital.routes'));
app.use('/api/medico', require('./routes/medico.routes'));
app.use('/api/todo', require('./routes/busqueda.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));





app.listen(process.env.PORT, () =>{
    console.log('Servidor levantado en el puerto ' + process.env.PORT)
})