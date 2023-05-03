const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const PublicationSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        default: 1
    },
    companyId: {
        type: Number,
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
    FiltroEstudios: {
        type: String,
        required: true
    },
    FiltroMunicipio: {
        type: String,
        required: true
    },
    caducidad: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }

},
    {
        versionKey: false
    }
);


const  Publication = mongoose.model("publication", PublicationSchema);

module.exports = Publication;