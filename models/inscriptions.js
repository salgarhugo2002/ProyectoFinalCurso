const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const InscriptionSchema = new mongoose.Schema({

    publicationId: {
        type: String,
        required: true
    },
    userId: {
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


const Inscription = mongoose.model("inscription", InscriptionSchema);

module.exports = Inscription;