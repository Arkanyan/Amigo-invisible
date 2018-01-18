const express = require('express');
const router = express.Router();
var helper = require('sendgrid').mail;
const async = require('async');
const sg = require('sendgrid')(''); 

router.get('/mensaje/enviar', function (req, res, next) {

	// Sendgrid Mailer
	function sendEmail(fromEmail, toEmails, subject, textContent, htmlContent) {
  const errorEmails = [];
  const successfulEmails = [];
  
  async.parallel([
    function(callback) {
      const senderEmail = new helper.Email(fromEmail);
      const toEmail = new helper.Email(toEmails);
      const content = new helper.Content('text/html', htmlContent);
      const mail = new helper.Mail(senderEmail, subject, toEmail, content);
      var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
      });
      sg.API(request, function (error, response) {
        console.log('SendGrid');
        if (error) {
        	console.log(error);
			  	req.flash('error_msg', 'Error al enviar el mensaje');
	 				res.redirect('/mensajes');
			  } else{
  			  	req.flash('success_msg', 'mensaje enviado');
    		  	res.redirect('/mensajes');
  	        console.log(response.statusCode);
  	        console.log(response.body);
  	        console.log(response.headers);
          }
        });  
      callback(null, true)
    }], 

    function(err, results) {
      console.log('Done');
    }); 
  }

  var emailMsg = `
    <h3>Tienes un nuevo mensaje de tu Amigo Invisible<h3><br>
    <p>${req.body.emailMsg}<p>
  `;

  async.parallel([
    function (callback) {
      sendEmail(
        'WebAmigoInvisible@hotmail.com',
        'agustinrafa1995@hotmail.com',
        'Nuevo mensaje de tu Amigo Invisible',
        'Text Content',
        emailMsg
      );
    }],
    function(err, results) {
      
      console.log({
        success: true,
        message: 'Emails sent',
        successfulEmails: results[0].successfulEmails,
        errorEmails: results[0].errorEmails,
  		});
   	}
  );
});

module.exports = router;