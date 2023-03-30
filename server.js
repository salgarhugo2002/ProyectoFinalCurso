// API REST per el manteniment de verdures 
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect('mongodb+srv://ivan:2002@cluster0.8mclcnb.mongodb.net',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

 const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=>{
    console.log("Connected successfully");
});

app.use(express.static(path.join(__dirname,'www')));
require('./api')(app);

app.listen(port, () => {
    console.log(`Servidor arrancat, escoltant el port ${port}`);
}); 


