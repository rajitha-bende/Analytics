var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	 locals = res.locals;
	 locals.pageController = 'indexController';
	view.render('analytics/dashboard');
}

exports.adoption = function(req, res) {
	var view = new keystone.View(req, res);
	view.render('analytics/dashboard');
}