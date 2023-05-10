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
const { format } = require('timeago.js')
const { unlink } = require('fs-extra')


module.exports = (app) => {
   app.use(morgan('dev'))
   const storage = multer.diskStorage({
      destination: path.join(__dirname, 'www/images/uploads'),
      filename: (req, file, cb, filname) => {
         cb(null, uuid() + path.extname(file.originalname))
      }
   })
   app.use(multer({ storage: storage }).single('image'))
   app.use(express.urlencoded({ extended: true }))
   app.use((req, res, next) => {
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
      app.locals.signinMessagecompany = req.flash('signinMessagecompany')
      app.locals.user = req.user
      
      next()
   })



   function isAuthenticated(req, res, next) {
      if (req.isAuthenticated(req, res, next)) {
         return next()
      }
      res.redirect('/login')
   }

   passport.serializeUser(function (user, done) {
      if (user instanceof User) {
         done(null, user._id)
      }else if(user instanceof Company){
         let company =user
         done(null, company._id)
      }
      
      
   })

   passport.deserializeUser(async function (_id, done) {
      const user = await User.findOne({ _id: _id })
      const company = await Company.findOne({ _id: _id })
      
      if (user instanceof User) {
         done(null, user)
      }
      else if(company instanceof Company){
         done(null, company)

      }
      
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


   passport.use('local-signup-company', new PassportLocal({
      usernameField: 'name',
      passwordField: 'email',
      passReqToCallback: true
   }, async (req, name, email, done) => {
      const company = await Company.findOne({ email: email })
      if (company) {
         done(null, false, "as")
      } else {
         const company = new Company()
      
         company.name = name
         company.email = email
         
         company.numeroTelefono = req.body.numeroTelefono
         company.calle = req.body.calle
         company.numeroCalle = req.body.numeroCalle
         company.municipio = req.body.municipio
         company.codigoPostal = req.body.codigoPostal
         company.nif = req.body.nif
         company.password = req.body.password
         company.repeatpassword = req.body.repeatpassword
         console.log(company)
         await company.save()
         done(null, company)

      }
   }))

   passport.use('local-signin-company', new PassportLocal({
      usernameField: 'email2',
      passwordField: 'password2',
      passReqToCallback: true
   }, async (req, email2, password2, done) => {
      const company = await Company.findOne({ email: email2 })

      if (!company) {
         return done(null, false, req.flash('signinMessagecompany', "No existe el usuario"))
      }
      if (!bcrypt.compareSync(password2,company.password)) {
         return done(null, false, req.flash('signinMessagecompany', "Contraseña incorrecta"))
      }
      done(null, company)
   }))


   app.set('view engine', 'ejs');
   app.set('views', __dirname + '/www/views')



   app.post('/register/user', passport.authenticate('local-signup', {
      successRedirect: "/",
      failureRedirect: "/register/user",
      passReqToCallback: true
   }))

   
   app.post('/login/user', passport.authenticate('local-signin', {
      successRedirect: "/",
      failureRedirect: "/login/user",
      passReqToCallback: true
   }))

   app.post('/login/company', passport.authenticate('local-signin-company', {
      successRedirect: "/company/home",
      failureRedirect: "/login/company",
      passReqToCallback: true
   }))

   app.post('/register/company', passport.authenticate('local-signup-company', {
      successRedirect: "/",
      failureRedirect: "/register/company",
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

   app.get('/login', async (req, res) => {

      res.render("login", { titulo: "Login" })
   });



   app.get('/login/user', async (req, res) => {

      res.render("loginuser", { titulo: "Login" })
   });


   app.get('/login/company', async (req, res) => {

      res.render("logincompany", { titulo: "Login" })
   });




   app.get('/register', async (req, res, next) => {
      res.render("register", { titulo: "Register" })
   });

   app.get("/logout", (req, res, next) => {
      

      req.logout(function(err){
         if(err){
           console.log(err);
         } else {
           res.redirect('/');
         }
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


   app.get('/publication/idmax', async (req, res) => {


      const publication = await Publication.find().select("id").sort({ id: -1 }).limit(1);

      try {
         res.status(200).send(publication);
      } catch (error) {
         res.status(500).send(error);
      }
   });


   app.get('/company/idmax', async (req, res) => {

      const company = await Company.find().select("id").sort({ id: -1 }).limit(1);

      try {
         res.status(200).send(user);
      } catch (error) {
         res.status(500).send(error);
      }
   });


   app.get('/profile', isAuthenticated, async (req, res) => {

      const image = await Image.find()

      res.render("user/profile", { titulo: "profile", image: image })
   })

   app.get('/upload', isAuthenticated, (req, res) => {
      res.render("imageForm", { titulo: "Image upload" })
   })



   app.get('/publication/show', async (req, res) => {

      const publication = await Publication.find({});

      try {
          res.status(200).send(publication);
      } catch (error) {
          res.status(500).send(error);
      }
  });

  app.get('/publication/:id', async (req, res) => {
   const id = req.params.id;
   const publi = JSON.stringify(await Publication.findOne({ id: id }))
   res.render("publications/publicationshow", {publiId: id, publi: publi ,titulo: "Publication"})
});


app.get('/company/show/:id', async (req, res) => {

   const id = req.params.id;

   const empr = JSON.stringify(await Company.findOne({ _id: id }))
   try {
       res.status(200).send(empr);
   } catch (error) {
       res.status(500).send(error);
   }
});


   app.post('/upload', isAuthenticated,async (req, res) => {
      const image = new Image()
      if (image.title == null && image.description == null) {
         image.title = "Foto_de_perfil"
         image.description = "Foto_de_perfil"
      } else
         image.title = req.body.title
      image.description = req.body.description
      image.filename = req.file.filename
      image.path = '/images/uploads/' + req.file.filename
      image.originalname = req.file.originalname
      image.mimetype = req.file.mimetype
      image.size = req.file.size
      console.log(image)
      await image.save()
      res.redirect("/image/" + image.id)
   })

   app.get('/image/:id', isAuthenticated, async (req, res) => {
      const { id } = req.params
      const image = await Image.findById(id)
      res.render('profileImage', { image: image, titulo: "profileImage" })
   })

   app.get('/verfoto', isAuthenticated, async (req, res) => {
      const images = await Image.find()
      res.render("verfoto", { images })
   })

   app.get('/image/:id/delete', isAuthenticated, async (req, res) => {
      const { id } = req.params
      const image = await Image.findByIdAndDelete(id)
      if (await unlink(path.resolve('./www' + image.path))) {
         res.redirect('/')
      } else {
         res.redirect('/')
      }
   })


    app.get('/password/:_id',isAuthenticated, async (req, res) => {
      const id = req.params._id;
      res.render("./user/changePassword",{titulo: "Cambiar contraseña", _id: id})
    });


    app.post('/password/:_id', async (req, res) => {
      const userId = req.params._id;
      const currentPassword = req.body.currentpassword
      const newPassword = req.body.newpassword;
      const repeatPassword = req.body.repeatpassword
      const user = await User.findOne({_id:userId})

      if (user) {
         console.log(user)
      if (!user) {
        return res.status(404).send('Usuario no encontrado');
      }
      else if(!bcrypt.compareSync(currentPassword,user.password)){
         return res.status(404).send('La contraseña actual no coincide con la de la base de datos');
      }
      else if(newPassword != repeatPassword){
         return res.status(404).send('Las contraseñas no coinciden');
      }else{
         user.password = newPassword;
         const hashed = bcrypt.hashSync(user.password,8)

         await User.updateOne({ _id: userId }, { $set: { password: hashed,repeatpassword:hashed } });
         res.send('Contraseña modificada correctamente');
      }
      }else{
         const companyId = req.params._id;
         const currentPassword = req.body.currentpassword
         const newPassword = req.body.newpassword;
         const repeatPassword = req.body.repeatpassword
         const company = await Company.findOne({_id:companyId})
         if (!company) {
            return res.status(404).send('Usuario no encontrado');
          }
          else if(!bcrypt.compareSync(currentPassword,company.password)){
             return res.status(404).send('La contraseña actual no coincide con la de la base de datos');
          }
          else if(newPassword != repeatPassword){
             return res.status(404).send('Las contraseñas no coinciden');
          }else{
             company.password = newPassword;
             const hashed = bcrypt.hashSync(company.password,8)
    
             await Company.updateOne({ _id: companyId }, { $set: { password: hashed,repeatpassword:hashed } });
             res.send('Contraseña modificada correctamente');
         }
      }
      

      
      
    });


    app.post('/deleteuser/:_id',isAuthenticated, async (req, res) => {
      const id = req.params._id;
      const user = await User.findOne({ _id: id })
      await User.deleteOne(user)
      res.redirect('/login');
    });

}







