var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	 locals = res.locals;
	 locals.pageController = 'personastatsController';
	view.render('analytics/personastats');
}

exports.personastats = function(req, res) {
	var view = new keystone.View(req, res);
	view.render('analytics/personastats');
}