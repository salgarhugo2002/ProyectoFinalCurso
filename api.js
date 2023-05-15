//Aqui definim les dependencies que necesitarem per realitzar el projecte

const express = require('express');
//model de les companyies
const Company = require('./models/company');
//model dels usuaris
const User = require('./models/user');
//model de les publicacions
const Publication = require('./models/publications');
//models de les inscripcions
const Inscription = require('./models/inscriptions');
//modul per encryptar les contrasenyes
const bcrypt = require('bcrypt')
//modul de sessions
const session = require('express-session')
//modul per la autentificacio d'usuaris
const passport = require('passport');
//modil per utilitzar cookies
const cookieParser = require('cookie-parser');
const PassportLocal = require('passport-local').Strategy
//modul per enviar missatges en cas d'error
const flash = require('connect-flash')
const path = require('path')
//modul per veure el trafic de xarxa, veure els metodes que s'estan utilitzant(get, post....)
const morgan = require('morgan')
const multer = require('multer');
//model de les imatges
const Image = require("./models/Image")
//modul per generar id aleatories
const uuid = require('uuid').v4
//per donar format a les dates
const { format } = require('timeago.js')
//per borrar continguts de la bdd i local
const { unlink } = require('fs-extra');
const { ObjectId } = require('mongodb');


module.exports = (app) => {

   //Tots els app.use son per definir tots els middlewares que s'utilitzaran
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


   // funció que dirà si un usuari està o no autenticat
   function isAuthenticated(req, res, next) {
      if (req.isAuthenticated(req, res, next)) {
         return next()
      }
      res.redirect('/login')
   }

   //Utilitzarem passport per fer tot el tema de login, register i autentificacio

   passport.serializeUser(function (user, done) {
      if (user instanceof User) {
         done(null, user._id)
      } else if (user instanceof Company) {
         let company = user
         done(null, company._id)
      }


   })

   passport.deserializeUser(async function (_id, done) {
      const user = await User.findOne({ _id: _id })
      const company = await Company.findOne({ _id: _id })

      if (user instanceof User) {
         done(null, user)
      }
      else if (company instanceof Company) {
         done(null, company)

      }

   })

   //autentificacio d'usuaris
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


   //registre d'usuaris

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
         newUser.phone = req.body.phone
         newUser.studies = req.body.studies
         if (newUser.password != newUser.repeatpassword) {
            done(null, false, req.flash('signupMessage', 'Las contraseñas no coinciden'))
         } else {
            await newUser.save()
            done(null, newUser)
         }
      }
   }))

   //autentificacio de companyies
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

   //registre de companyies
   passport.use('local-signin-company', new PassportLocal({
      usernameField: 'email2',
      passwordField: 'password2',
      passReqToCallback: true
   }, async (req, email2, password2, done) => {
      const company = await Company.findOne({ email: email2 })

      if (!company) {
         return done(null, false, req.flash('signinMessagecompany', "No existe el usuario"))
      }
      if (!bcrypt.compareSync(password2, company.password)) {
         return done(null, false, req.flash('signinMessagecompany', "Contraseña incorrecta"))
      }
      done(null, company)
   }))

   //definir el directori de les views
   app.set('view engine', 'ejs');
   app.set('views', __dirname + '/www/views')



   app.post('/register/user', passport.authenticate('local-signup', {
      successRedirect: "/",
      failureRedirect: "/register/user",
      passReqToCallback: true
   }))

   //endpoint post per iniciar sessio amb un usuari

   app.post('/login/user', passport.authenticate('local-signin', {
      successRedirect: "/",
      failureRedirect: "/login/user",
      passReqToCallback: true
   }))

   //endpoint post per iniciar sessio amb una companyia
   app.post('/login/company', passport.authenticate('local-signin-company', {
      successRedirect: "/company/home",
      failureRedirect: "/login/company",
      passReqToCallback: true
   }))

   //endpoint post per registrar els usuaris
   app.post('/register/company', passport.authenticate('local-signup-company', {
      successRedirect: "/",
      failureRedirect: "/register/company",
      passReqToCallback: true
   }))



   //endpoint post per crear els usuaris
   app.post('/publication/create', async (req, res) => {
      const publication = new Publication(req.body);

      try {
         await publication.save();
         const respon = await Publication.find({});
         res.status(200).send(respon);

      } catch (error) {
         res.status(500).send(error);
      }
   });


   //endpoint post per crear les inscripcions
   app.post('/inscription/create', async (req, res) => {
      const inscription = new Inscription(req.body);

      console.log(req.body)
      try {
         await inscription.save();
         const respon = await Inscription.find({});
         res.status(200).send(respon);

      } catch (error) {
         res.status(500).send(error);
      }
   });



   //endpoint get per obtenir la pagina principal
   app.get('/', async (req, res) => {

      res.render("user/home", { titulo: "Home" })
   });

   //endpoint get per obtenir la pagina per iniciar sessio com usuari o com empresa
   app.get('/login', async (req, res) => {

      res.render("login", { titulo: "Login" })
   });


   //endpoint get per obtenir el forumlari per fer login amb un usuari

   app.get('/login/user', async (req, res) => {

      res.render("loginuser", { titulo: "Login" })
   });

   //endpoint get per obtenir el forumlari per fer login amb una empresa

   app.get('/login/company', async (req, res) => {

      res.render("logincompany", { titulo: "Login" })
   });



   //endpoint get per obtenir la pagina on podrem decirir registrar-nos com usuari o empresa

   app.get('/register', async (req, res, next) => {
      res.render("register", { titulo: "Register" })
   });


   //endpoint get que borrarà la sessió actual

   app.get("/logout", (req, res, next) => {


      req.logout(function (err) {
         if (err) {
            console.log(err);
         } else {
            res.redirect('/');
         }
      });

   })


   //endpoint get per obtenir el forumlari per registrar companyies

   app.get('/register/company', async (req, res) => {

      res.render("company/companyForm", { titulo: "Register company" })
   });


   //endpoint get per obtenir el forumlari per regitrar usuaris

   app.get('/register/user', async (req, res) => {

      res.render("user/userForm", { titulo: "Register User" })
   });

   //endpoint get per obtenir la pagina principal de les companyies

   app.get('/company/home', isAuthenticated, async (req, res) => {


      res.render("company/home", { titulo: "Home" })
   });


   //endpoint get per obtenir el perfil dels usuaris

   app.get('/profile', isAuthenticated, async (req, res) => {

      const image = await Image.find()

      res.render("user/profile", { titulo: "profile", image: image })
   })

   //endpoint get per obtenir el forumlari per pujar l'imatge

   app.get('/upload', isAuthenticated, (req, res) => {
      res.render("imageForm", { titulo: "Image upload" })
   })


   //endpoint get per obtenir les publicacions

   app.get('/publication/show', async (req, res) => {

      const publication = await Publication.find({});

      try {
         res.status(200).send(publication);
      } catch (error) {
         res.status(500).send(error);
      }
   });

   //endpoint get per obtenir tots els usuaris

   app.get('/users', async (req, res) => {

      const publication = await User.find({});

      try {
         res.status(200).send(publication);
      } catch (error) {
         res.status(500).send(error);
      }
   });

   //endpoint get per obtenir totes les inscripcions

   app.get('/inscriptions', async (req, res) => {

      const inscription = await Inscription.find({});

      try {
         res.status(200).send(inscription);
      } catch (error) {
         res.status(500).send(error);
      }
   });




   //endpoint get per obtenir les publicacions a traves de la seva id


   app.get('/publication/:_id', isAuthenticated, async (req, res) => {
      const id = req.params._id;
      const publi = JSON.stringify(await Publication.findOne({ _id: id }))
      res.render("publications/publicationshow", { publiId: id, publi: publi, titulo: "Publication" })
   });





   //endpoint get per obtenir l'objecte de la companyia a traves de la id

   app.get('/company/show/:id', async (req, res) => {

      const id = req.params.id;

      const empr = JSON.stringify(await Company.findOne({ _id: id }))
      try {
         res.status(200).send(empr);
      } catch (error) {
         res.status(500).send(error);
      }
   });

   //endpoint post per pujar les imatges

   app.post('/upload', isAuthenticated, async (req, res) => {
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

   //endpoint get per obtenir l'imatge atraves de l'id

   app.get('/image/:id', isAuthenticated, async (req, res) => {
      const { id } = req.params
      const image = await Image.findById(id)
      res.render('profileImage', { image: image, titulo: "profileImage" })
   })
   //endpoint get per veure totes les fotos pujades

   app.get('/verfoto', isAuthenticated, async (req, res) => {
      const images = await Image.find()
      res.render("verfoto", { images })
   })

   //endpoint get per borrar les imatges

   app.get('/image/:id/delete', isAuthenticated, async (req, res) => {
      const { id } = req.params
      const image = await Image.findByIdAndDelete(id)
      if (await unlink(path.resolve('./www' + image.path))) {
         res.redirect('/')
      } else {
         res.redirect('/')
      }
   })

   //endpoint get per obtenir el forumlari per cambiar la contrasenya

   app.get('/password/:_id', isAuthenticated, async (req, res) => {
      const id = req.params._id;
      res.render("./user/changePassword", { titulo: "Cambiar contraseña", _id: id })
   });

   //endpoint post per obtenir les dades del form i cambiar la contrasenya

   app.post('/password/:_id', async (req, res) => {
      const userId = req.params._id;
      const currentPassword = req.body.currentpassword
      const newPassword = req.body.newpassword;
      const repeatPassword = req.body.repeatpassword
      const user = await User.findOne({ _id: userId })

      if (user) {
         console.log(user)
         if (!user) {
            return res.status(404).send('Usuario no encontrado');
         }
         else if (!bcrypt.compareSync(currentPassword, user.password)) {
            return res.status(404).send('La contraseña actual no coincide con la de la base de datos');
         }
         else if (newPassword != repeatPassword) {
            return res.status(404).send('Las contraseñas no coinciden');
         } else {
            user.password = newPassword;
            const hashed = bcrypt.hashSync(user.password, 8)

            await User.updateOne({ _id: userId }, { $set: { password: hashed, repeatpassword: hashed } });
            res.redirect("/profile")
         }
      } else {
         const companyId = req.params._id;
         const currentPassword = req.body.currentpassword
         const newPassword = req.body.newpassword;
         const repeatPassword = req.body.repeatpassword
         const company = await Company.findOne({ _id: companyId })
         if (!company) {
            return res.status(404).send('Usuario no encontrado');
         }
         else if (!bcrypt.compareSync(currentPassword, company.password)) {
            return res.status(404).send('La contraseña actual no coincide con la de la base de datos');
         }
         else if (newPassword != repeatPassword) {
            return res.status(404).send('Las contraseñas no coinciden');
         } else {
            company.password = newPassword;
            const hashed = bcrypt.hashSync(company.password, 8)

            await Company.updateOne({ _id: companyId }, { $set: { password: hashed, repeatpassword: hashed } });
            res.redirect("/profile")
         }
      }




   });


   app.post('/deleteuser/:_id', isAuthenticated, async (req, res) => {
      const id = req.params._id;
      const user = await User.findOne({ _id: id });
      const company = await Company.findOne({ _id: id });
      const publi = await Publication.find({companyId:id})
      
      
     
      if (user) {
        console.log(user)
        await User.deleteOne(user)
        res.redirect("/login")
      }else{
         publi.forEach(async (element) =>{
            if (element.companyId == company._id) {
               console.log(element)
               await Publication.deleteOne(element)
            }
         })
         await Company.deleteOne(company)
         res.redirect("/login")
      }

   });





   app.post('/deletepublication/:_id', isAuthenticated, async (req, res) => {
      const id = req.params._id;
      const publication = await Publication.findOne({ _id: id })
      console.log(publication)
      await Publication.updateOne({ _id: publication }, { $set: { active: false } })
      res.redirect("/")
   });



   app.get('/nohaypublications', async (req, res) => {

      res.render("noHayPublications", { titulo: "No hay publicaciones" })
   });


   app.post('/inscriptions/delete/:_id/:id', async (req, res) => {

      const _id = req.params._id;
      const id = req.params.id

      const inscr = await Inscription.findOne({ _id: _id })
      await inscr.deleteOne(inscr)
      res.redirect("/publication/" + id)
   });



   app.get('/profile/:_id', async (req, res) => {
      const id = req.params._id
      const usr = await User.findOne({ _id: ObjectId(id) })

      res.render("nuevoPerfil", { titulo: "Perfil", user: usr })
   });



}







