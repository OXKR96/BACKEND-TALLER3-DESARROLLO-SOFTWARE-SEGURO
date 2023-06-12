const {Schema, model} = require('mongoose')


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: { //estado
        type: String,
        required: true,
        unique:true
    },
    rol:{
        type:String,
        required: true,
        enum:['ADMIN','OBSERVADOR']
    },
    contraseña:{
        type:String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
})


module.exports = model('Usuario', UsuarioSchema)
