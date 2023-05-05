const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    username: {
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
    repeatpassword: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: "user"
    }

},
    {
        versionKey: false
    }
);


UserSchema.pre('save', async function (next) {
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


const User = mongoose.model("user", UserSchema);

module.exports = User;