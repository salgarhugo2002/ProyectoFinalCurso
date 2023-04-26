const mongoose = require("mongoose");

const EducativeCenterSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: 1
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    numeroCalle: {
        type: Number,
        required: true
    },
    municipio: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: Number,
        required: true
    },
    identificador: {
        type: String,
        required: true
    },
    
},
{
    versionKey:false
}
);

const EducativeC = mongoose.model("user", EducativeCenterSchema);
mongoose.set('strictQuery', false);
module.exports = EducativeC;