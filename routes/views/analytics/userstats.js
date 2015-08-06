var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	 locals = res.locals;
	 locals.pageController = 'userstatsController';
	view.render('analytics/userstats');
}

exports.userstats = function(req, res) {
	var view = new keystone.View(req, res);
	view.render('analytics/userstats');
}