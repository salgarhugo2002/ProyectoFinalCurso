const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        default: 1
    },
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
    }
    
},
{
    versionKey:false
}
);

const User = mongoose.model("user", UserSchema);

module.exports = User;