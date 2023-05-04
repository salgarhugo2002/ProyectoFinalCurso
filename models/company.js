const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const CompanySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
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
    numeroTelefono: {
        type: Number,
        required: true
    },
    nif: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    ,
    repeatpassword: {
        type: String,
        required: true
    }

},
    {
        versionKey: false
    }
);

CompanySchema.pre('save', async function (next) {
    try {
        if (this.password == this.repeatpassword) {
            const hashedPassword = await bcrypt.hash(this.password, 8)
            this.password = hashedPassword
            this.repeatpassword = hashedPassword
        }
        next()
    } catch (error) {
        next(error)
    }

})

const Company = mongoose.model("company", CompanySchema);

module.exports = Company;