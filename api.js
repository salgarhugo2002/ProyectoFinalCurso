const { response } = require('express');
const EducativeC = require('./models/educativeCenter');

module.exports = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', __dirname+'/www/views')


     
    app.get('/', async (req, res) => {
        
       res.render("login",{titulo: "mi titulo dinamico"})
    });

    app.get('/register', async (req, res) => {
        
        res.render("register",{titulo: "mi titulo dinamico"})
     });
 


     app.get('/register/educativecenter', async (req, res) => {
        
      res.render("login",{titulo: "mi titulo dinamico"})
   });

     app.post('/register/educativecenter', async (req, res) => {
      const centre = new EducativeC(req.body);

      try {
          await centre.save();
          const respon = await EducativeC.find({});
          res.status(200).send(respon);
      } catch (error) {
          res.status(500).send(error);
      }
  });
    
    
}










