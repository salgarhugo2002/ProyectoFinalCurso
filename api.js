const { response } = require('express');
const EducativeC = require('./models/educativeCenter');
const Company = require('./models/company');
const User = require('./models/user');

module.exports = (app) => {
   app.set('view engine', 'ejs');
   app.set('views', __dirname + '/www/views')



   app.get('/', async (req, res) => {

      res.render("login", { titulo: "mi titulo dinamico" })
   });

   app.get('/register', async (req, res) => {

      res.render("register", { titulo: "mi titulo dinamico" })
   });



   app.get('/register/educativecenter', async (req, res) => {

      res.render("educativecenter/registerForm", { titulo: "mi titulo dinamico" })
   });


   app.get('/register/company', async (req, res) => {

      res.render("company/companyForm", { titulo: "mi titulo dinamico" })
   });



   app.get('/register/user', async (req, res) => {

      res.render("user/userForm", { titulo: "mi titulo dinamico" })
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



   app.post('/register/company', async (req, res) => {
      const company = new Company(req.body);

      try {
         await company.save();
         const respon = await Company.find({});
         res.status(200).send(respon);
      } catch (error) {
         res.status(500).send(error);
      }
   });



   app.post('/register/user',async (req, res) => {
      const company = new User(req.body);

      try {
         await company.save();
         const respon = await User.find({});
         res.status(200).send(respon);
        
      } catch (error) {
         res.status(500).send(error);
      }
   });


}










