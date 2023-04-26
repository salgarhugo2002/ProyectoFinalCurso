const { response } = require('express');

module.exports = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', __dirname+'/www/views')


     
    app.get('/', async (req, res) => {
        
       res.render("login",{titulo: "mi titulo dinamico"})
    });

    app.get('/register', async (req, res) => {
        
        res.render("register",{titulo: "mi titulo dinamico"})
     });
 

    
    
    
}










