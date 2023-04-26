const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
    }
    
},
{
    versionKey:false
}
);

const User = mongoose.model("user", UserSchema);
mongoose.set('strictQuery', false);
module.exports = User;