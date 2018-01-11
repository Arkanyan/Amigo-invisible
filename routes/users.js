var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../modulos/user');

// Register
router.get('/registration', function(req, res){
	res.render('registration');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register User
router.post('/registration', function(req, res){
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('email', 'Se necesita un email').notEmpty();
	req.checkBody('email', 'Debe ser un email').isEmail();
	req.checkBody('username', 'Se necesita un nombre de usuario').notEmpty();
	req.checkBody('password', 'Se necesita una contraseña').notEmpty();
	req.checkBody('password2', 'La contraseña es diferente').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('registration',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'Felicidades, ya estas registrado');

		res.redirect('/login');
	}
});

// Login user
passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Usuario o contraseña incorrecta'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Usuario o contraseña incorrecta'});
   		}
   	});
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//Logout
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login'}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'Usted se a desconectado');

	res.redirect('/login');
});

module.exports = router;