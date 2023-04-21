const { response } = require('express');

module.exports = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', __dirname+'/www/views')


     
    app.get('/main', async (req, res) => {
        
       res.render("index",{titulo: "mi titulo dinamico"})
    });

    
    
    
}










