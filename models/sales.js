// Traemos el objeto mongoose desde la dependencia
const mongoose = require("mongoose")

// Creamos una constante llamada Schema con un objeto de mongoose
const Schema = mongoose.Schema

// Instanciamos el objeto Schema enviando como propiedad la estructura 
const salesSchema = new Schema({
    numSale: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    }
}, { timestamps: true })

// Exportamos el modelo del esquema
module.exports = mongoose.model("Sales", salesSchema)