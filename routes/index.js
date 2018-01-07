var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('home', { selected: { home: true}})
  });

router.get('/mensajes', function (req, res){
		res.render('mensajes', { selected: { mensajes: true}})
	});

router.get('/perfil', function (req, res){
		res.render('perfil', { selected: { mensajes: true}})
	});
/*
router.get('/login', function (req, res) {
    res.render('login')
	});

router.get('/registration', function (req, res) {
    res.render('registration')
	});
*/
module.exports = router;