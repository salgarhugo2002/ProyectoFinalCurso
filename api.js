const express = require('express');
const EducativeC = require('./models/educativeCenter');
const Company = require('./models/company');
const User = require('./models/user');
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const PassportLocal = require('passport-local').Strategy
const flash = require('connect-flash')

module.exports = (app) => {
   app.use(express.urlencoded({ extended: false }))
   app.use(cookieParser('superSecreto'))
   app.use(session({
      secret: 'superSecreto',
      resave: true,
      saveUninitialized: true
   }))
   app.use(flash())
   app.use(passport.initialize())
   app.use(passport.session())
   app.use((req, res, next) => {
      app.locals.signinMessage = req.flash('signinMessage')
      app.locals.user = req.user
      next()
   })



   function isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
         return next()
      }
      res.redirect('/')
   }
   passport.serializeUser(function (user, done) {
      done(null, user.id)
   })

   passport.deserializeUser(async function (id, done) {
      const user = await User.findOne({ id: id })
      done(null, user)
   })

   passport.use('local-signin', new PassportLocal({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
   }, async (req, email, password, done) => {
      const user = await User.findOne({ email: email })

      if (!user) {
         return done(null, false, req.flash('signinMessage', "No existe el usuario"))
      }
      if (!bcrypt.compareSync(password, user.password)) {
         return done(null, false, req.flash('signinMessage', "Contraseña incorrecta"))
      }
      done(null, user)
   }))


   app.set('view engine', 'ejs');
   app.set('views', __dirname + '/www/views')


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



   app.post('/register/user', async (req, res) => {
      const user = new User(req.body);
      try {
         await user.save();
         const respon = await User.find({});
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


   app.post('/login/user', passport.authenticate('local-signin', {
      successRedirect: "/register",
      failureRedirect: "/",
      passReqToCallback: true
   }))

   app.get('/', async (req, res) => {

      res.render("login", { titulo: "Login" })
   });

   app.get('/register', async (req, res, next) => {
      res.render("register", { titulo: "Register" })
   });

   app.get("/logout", (req, res, next) => {
      req.logout(function(err){
         if (err) throw err;
         res.redirect('/');
       });
      
   })

   app.get('/register/educativecenter', async (req, res) => {

      res.render("educativecenter/registerForm", { titulo: "Register educative center" })
   });


   app.get('/register/company', async (req, res) => {

      res.render("company/companyForm", { titulo: "Register company" })
   });



   app.get('/register/user', async (req, res) => {

      res.render("user/userForm", { titulo: "Register User" })
   });

   app.get('/user/idmax', async (req, res) => {


      const user = await User.find().select("id").sort({ id: -1 }).limit(1);

      try {
         res.status(200).send(user);
      } catch (error) {
         res.status(500).send(error);
      }
   });


   

}







