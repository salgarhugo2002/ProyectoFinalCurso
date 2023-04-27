const { response, json } = require('express');
const EducativeC = require('./models/educativeCenter');
const Company = require('./models/company');
const User = require('./models/user');
const bcrypt = require('bcrypt')

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
      const user = new User(req.body);

      let pas = ""
      let pas2 = ""
      let haseado = ""

      for (const key in user) {
    
  
         if (key == "password") {
             pas = user[key]
         }
         if (key == "repeatpassword") {
             pas2 = user[key]
         }
         
     }
     if (pas == pas2) {
      user.password = await bcrypt.hash(pas,8)
      user.repeatpassword = await bcrypt.hash(pas2,8)
     }
     
      try {
         await user.save();
         const respon = await User.find({});
         res.status(200).send(respon);
        
      } catch (error) {
         res.status(500).send(error);
      }
   });

   app.post('/register/company',async (req, res) => {
      const company = new Company(req.body);

      try {
         await company.save();
         const respon = await Company.find({});
         res.status(200).send(respon);
        
      } catch (error) {
         res.status(500).send(error);
      }
   });


}










