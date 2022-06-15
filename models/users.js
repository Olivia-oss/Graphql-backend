// Traemos el objeto mongoose desde la dependencia
const mongoose = require("mongoose")

// Creamos una constante llamada Schema con un objeto de mongoose
const Schema = mongoose.Schema

// Instanciamos el objeto Schema enviando como propiedad la estructura 
const usuariosSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cuenta:{
        type: String,
    }
}, { timestamps: true })

// Exportamos el modelo del esquema
module.exports = mongoose.model("Users", usuariosSchema)