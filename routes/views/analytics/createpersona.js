var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	 locals = res.locals;
	view.render('analytics/createpersona');
}

exports.createpersona = function(req, res) {
	var view = new keystone.View(req, res);
	view.render('analytics/createpersona');
}