const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const PublicationSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        default: 1
    },
    companyId: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    filtroEstudios: {
        type: String,
        required: true
    },
    filtroMunicipio: {
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    caducidad: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        required: false,
        default: true
    }

},
    {
        versionKey: false
    }
);


const  Publication = mongoose.model("publication", PublicationSchema);

module.exports = Publication;