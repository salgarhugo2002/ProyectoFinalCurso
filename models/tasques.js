const mongoose = require("mongoose");

const TascaSchema = new mongoose.Schema({
    _titol:{
        type:String
    },
    _text:{
        type:String
    },
    _codi: {
        type: Number,
        default: 0
    },
    _data_creacio:{
        type: String
    },
    _data_previsio_finalitzacio:{
        type:String
    },
    _responsable:{
        type:Number
    },
    _Lista: {
        type: String
    },
    
    _prioridad:{
        type:String
    }
    
   
    
    
},
{
    versionKey:false
}
);

const Tasca = mongoose.model("tasques", TascaSchema);
mongoose.set('strictQuery', false);
module.exports = Tasca;