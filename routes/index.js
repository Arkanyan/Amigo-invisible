const express = require('express');
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb://localhost:27017/amigoInvisible';

router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.get('/mensajes', ensureAuthenticated, function(req, res){
  res.render('mensajes');
});

router.get('/perfil', ensureAuthenticated, function(req, res){
	res.render('perfil');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
};

router.get('/perfil/sorteo', function(req, res){
	var username = req.user.username;
	MongoClient.connect(url, function(error, database){
		var	db = database.db('amigoInvisible');
		var users = db.collection('users');

		users.updateOne({"username": username}, {$set: {"participant": true}});

		database.close();

		req.flash('success_msg', 'Gracias por participar');
		res.redirect('/perfil')
	});	
});

module.exports = router;