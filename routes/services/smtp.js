/*var path = require('path');
var keystone = require('keystone');
var nodemailer = require("nodemailer");
var emailTemplates = require('email-templates');
var emailTemplateDir = path.join(keystone.get('dirname') + '/templates', '.' , 'email_templates');
		console.log(emailTemplateDir);

exports.send = function ( sendOptions , res ){
	emailTemplates(emailTemplateDir, function(err, template) {
		var smtpTransport = nodemailer.createTransport("Sendmail", "/usr/sbin/sendmail");
		
		template(sendOptions.templateName , sendOptions.locals, function(err, html, text) {
			sendOptions.mailOptions.html = html;
			
			smtpTransport.sendMail(sendOptions.mailOptions, function(error, responseStatus){
			    if(!error){
					res(true);
			    } else {
					res(false);
			    }
			    smtpTransport.close();
			});
		});
	});
};*/