const express = require('express');
const router = express.Router();
// var nodemailer = require('nodemailer');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

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
}

router.get('/mensaje/enviar', function (req, res, next) {
	
	var emailMsg = `
		<h3>Tienes un nuevo mensaje de tu Amigo Invisible<h3><br>
		<p>${req.body.emailMsg}<p>
	`;

	var request = sg.emptyRequest({
	  method: 'POST',
	  path: './sendgrid',
	  body: {
	    personalizations: [
	      {
	        to: [
	          {
	            email: 'agustinrafa1995@hotmail.com'
	          }
	        ],
	        subject: 'Nuevo mensaje de tu Amigo Invisible!'
	      }
	    ],
	    from: {
	      email: 'WebAmigoInvisible@hotmail.com'
	    },
	    content: [
	      {
	        type: 'html',
	        value: emailMsg,
	      }
	    ]
	  }
	});

	sg.API(request, function (error, response) {
	  if (error) {
	    console.log(error);
	  	req.flash('error_msg', 'Error al enviar el mensaje');
	 		res.redirect('/mensajes');
	  } else{
	  	  req.flash('success_msg', 'mensaje enviado');
	    	res.redirect('/mensajes');
	    }
	});

	// if (error) {
 //  	console.log(error);
 //  	req.flash('error_msg', 'Error al enviar el mensaje');
 // 		res.redirect('/mensajes');
 //    return
 //  } else {
 //    	req.flash('success_msg', 'mensaje enviado');
 //  		res.redirect('/mensajes');
 //  	};

	// var transporter = nodemailer.createTransport({
	// 	host: 'smtp.live.com',
	// 	port: 465,
	// 	secure: false,
	// 	auth: {
	// 	  user: 'WebAmigoInvisible@hotmail.com',
	// 	  pass: 'Rafa1995.',
	// 	},
	// 	tls:{
	// 		rejectUnauthorized:false
	// 	}
	// });

	// let mailOptions = {
	//   from: '"Amigo Invisible" WebAmigoInvisible@hotmail.com',
	//   to: 'agustinrafa1995@hotmail.com',
	//   subject: 'Nuevo mensaje de tu Amigo Invisible',
	//   text: 'Hola',
	//   html: emailMsg,
	// };

	// transporter.sendMail(mailOptions, (error, info) => {
 //    if (error) {
 //    	console.log(error);
 //    	req.flash('error_msg', 'Error al enviar el mensaje');
	//  		res.redirect('/mensajes');
 //      return
 //    }
 //    console.log('Message sent: %s', info.messageId);
 //    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
 //    req.flash('success_msg', 'mensaje enviado');
	// 	res.redirect('/mensajes');
	// });
});

module.exports = router;