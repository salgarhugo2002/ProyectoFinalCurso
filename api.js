const express = require('express');
const EducativeC = require('./models/educativeCenter');
const Company = require('./models/company');
const User = require('./models/user');
const Publication = require('./models/publications');
const bcrypt = require('bcrypt')
const session = require('express-session')
const passport = require('passport');
const cookieParser = require('cookie-parser');
const PassportLocal = require('passport-local').Strategy
const flash = require('connect-flash')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer');
const Image = require('./models/image');
const uuid = require('uuid').v4
const {format} = require('timeago.js')
const {unlink} = require('fs-extra')


module.exports = (app) => {
   app.use(morgan('dev'))
   const storage = multer.diskStorage({
      destination: path.join(__dirname, 'www/images/uploads'),
      filename: (req, file, cb, filname) => {
         cb(null, uuid() + path.extname(file.originalname))
      }
   })
   app.use(multer({storage: storage}).single('image'))
   app.use(express.urlencoded({ extended: false }))
   app.use((req,res,next)=>{
      app.locals.format = format
      next()
   })
   app.use(cookieParser('superSecreto'))
   app.use(session({
      name: 'usersesion',
      secret: 'superSecreto',
      resave: true,
      saveUninitialized: true
   }))
   app.use(flash())
   app.use(passport.initialize())
   app.use(passport.session())
   app.use((req, res, next) => {
      app.locals.signinMessage = req.flash('signinMessage')
      app.locals.signupMessage = req.flash('signupMessage')
      app.locals.user = req.user
      next()
   })



   function isAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
         return next()
      }
      res.redirect('/user/login')
   }
   passport.serializeUser(function (user, done) {
      if (user.id == null) {
         user['id'] = 1
      }
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

   async function returnMaxId() {
      return await fetch('http://localhost:3000/user/idmax')
         .then((res) => res.json());

   }


   async function idmax() {

      const response = await returnMaxId();

      try {

         let abc = response[0].id;

         return abc + 1;
      } catch (error) {

         console.log("no hi ha cap responsable a la BDD, pero hem posat que la id default sigui 0 , aquest misatge salta igual pero funciona tot");
      }
   }
   passport.use('local-signup', new PassportLocal({
      usernameField: 'username',
      passwordField: 'email',
      passReqToCallback: true
   }, async (req, username, email, done) => {
      const user = await User.findOne({ email: email })
      if (user) {
         done(null, false, req.flash('signupMessage', 'The email is alerdy taken'))
      } else {
         const newUser = new User()
         if (newUser.id == undefined) {
            newUser.id = 1
         }
         else if (newUser.id != undefined) {
            newUser.id = await idmax()
         }
         console.log(newUser.id)

         newUser.username = username
         newUser.email = email
         newUser.password = req.body.password
         newUser.repeatpassword = req.body.repeatpassword
         if (newUser.password != newUser.repeatpassword) {
            done(null, false, req.flash('signupMessage', 'Las contraseñas no coinciden'))
         } else {
            await newUser.save()
            done(null, newUser)
         }

      }

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



   app.post('/register/user', passport.authenticate('local-signup', {
      successRedirect: "/",
      failureRedirect: "/register/user",
      passReqToCallback: true
   }))

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
      successRedirect: "/",
      failureRedirect: "/user/login",
      passReqToCallback: true
   }))




   app.post('/publication/create', async (req, res) => {
      const publication = new Publication (req.body);

      try {
         await publication.save();
         const respon = await Publication.find({});
         res.status(200).send(respon);

      } catch (error) {
         res.status(500).send(error);
      }
   });








   app.get('/', async (req, res) => {

      res.render("user/home", { titulo: "Home" })
   });

   app.get('/user/login', async (req, res) => {

      res.render("user/login", { titulo: "Login" })
   });

   app.get('/register', async (req, res, next) => {
      res.render("register", { titulo: "Register" })
   });

   app.get("/logout", (req, res, next) => {
      req.logout(function (err) {
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


   app.get('/company/home', async (req, res) => {

      res.render("company/home", { titulo: "Home" })
   });

   app.get('/user/idmax', async (req, res) => {


      const user = await User.find().select("id").sort({ id: -1 }).limit(1);

      try {
         res.status(200).send(user);
      } catch (error) {
         res.status(500).send(error);
      }
   });


   app.get('/profile', isAuthenticated, async (req, res) => {
      res.render("user/profile", { titulo: "profile" })
   })

   app.get('/upload', (req, res) => {
      res.render("imageForm", { titulo: "Image upload" })
   })

   app.post('/upload', isAuthenticated,async (req, res) => {
      const image = new Image()
      image.title = req.body.title
      image.description = req.body.description
      image.filename = req.file.filename
      image.path = '/images/uploads/' + req.file.filename
      image.originalname = req.file.originalname
      image.mimetype = req.file.mimetype
      image.size = req.file.size
      await image.save()
      res.redirect("/verfoto")
   })

   app.get('/image/:id', isAuthenticated,async(req, res) => {
      const {id} = req.params
      const image = await Image.findById(id)
      res.render('profileImage',{image:image,titulo: "profileImage"})
   })

   app.get('/verfoto', isAuthenticated,async(req, res) => {
     const images =await Image.find()
     res.render("verfoto", {images})
   })

   app.get('/image/:id/delete',isAuthenticated,async (req, res) => {
      const {id} = req.params
      const image = await Image.findByIdAndDelete(id)
      await unlink(path.resolve('./www' + image.path))
      res.render("./user/profile",{titulo: "userhome"})
   })

}







