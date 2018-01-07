var express = require('express');
var router = express.Router();

var User = require("../modules/user");

router.get('/login', function (req, res) {
    res.render('login')
	});

router.get('/registration', function (req, res) {
    res.render('registration')
	});

// Registration
router.post('/registration', function (req, res) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.checkBody('email', 'Debe ser un email').isEmail();
    req.checkBody('email', 'Se necesita un email').notEmpty();
    req.checkBody('username', 'Se necesita un nombre de usuario').notEmpty();
    req.checkBody('password', 'Se necesita una contraseña').notEmpty();
    req.checkBody('password2', 'La contraseña debe ser igual').equals(req.body.password);

    var error = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    } else {
        var newUser = new User({
            username: username,
            email:email,
            password: password
        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        })

        req.flash('exito_msg', 'Felicidades, ya estas registrado');

        res.redirect('/login');
	};

module.exports = router;