const {Schema, model} = require('mongoose');


const HospitalSchema = Schema({

    name:{
        type:String,
        require:true,
    },

    img:{
        type:String,
    },
    //Referencia al id de la clase exportada por el esquema de usuario
    user:{
        require:true,
        type: Schema.Types.ObjectId,
        ref:'User'
    }
}, /*{collection: 'Hospitales'}// Si quiero que mo renombre solo con la*/ );

HospitalSchema.method('toJSON', function(){
    const { __v,_id, ...object } = this.toObject();

    object.uid = _id;
    return object;
});

//Mongoose pone el plural, se configurará
module.exports = model('Hospital', HospitalSchema);