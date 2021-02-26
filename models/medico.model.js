const {Schema, model} = require('mongoose');


const MedicoSchema = Schema({

    name:{
        type:String,
        require:true,
    },

    img:{
        type:String,
    },
    //Referencia al id de la clase exportada por el esquema de usuario
    hospital:{
        require:true,
        type: Schema.Types.ObjectId,
        ref:'Hospital'
    },
    user:{
        require:true,
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});

MedicoSchema.method('toJSON', function(){
    const { __v,_id, ...object } = this.toObject();

    object.uid = _id;
    return object;
});

//Mongoose pone el plural, se configurará
module.exports = model('Medico', MedicoSchema);