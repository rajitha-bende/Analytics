var keystone = require('keystone')
    , middleware = require('./middleware')
    , importRoutes = keystone.importer(__dirname)
    , authentication = require('./services/authentication')
    , account  = require('./services/account')
    , fs = require('fs')
    , jade = require('jade')
	, uaParser = require('ua-parser-js');

var parser = new uaParser();

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
 
// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound();
});
 
// Handle other errors
keystone.set('500', function(err, req, res, next) {
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
	console.log(message);       // TODO: Remove this or log it somewhere.
});
 
// Load Routes
var routes = {
    views: importRoutes('./views/analytics')
};

// Bind Routes
exports = module.exports = function(app) {
    app.get('/', routes.views.index);
	app.get('/dashboard', routes.views.dashboard);
	app.get('/adoption?/?', routes.views.adoption);
	app.get('/userstats?/?', routes.views.userstats);
	app.get('/personastats?/?', routes.views.personastats);
	app.get('/memberdetails?/?', routes.views.memberdetails);
	app.get('/activity?/?', routes.views.actiondata);
	app.get('/feedback?/?', routes.views.feedback);
	app.get('/platform?/?', routes.views.platform);
	app.get('/realtime?/?', routes.views.realtime);
	app.get('/analytics/actiondata/sendcontact?/?', routes.views.sendcontact);
	app.get('/analytics/actiondata/signin?/?', routes.views.signin);
	app.get('/analytics/actiondata/signout?/?', routes.views.signout);
	app.get('/analytics/actiondata/createpersona?/?', routes.views.createpersona);
	app.get('/analytics/actiondata/editpersona?/?', routes.views.editpersona);
	app.get('/analytics/actiondata/deletepersona?/?', routes.views.deletepersona);
	app.get('/analytics/actiondata/viewcontacts?/?', routes.views.viewcontacts);
	app.get('/analytics/actiondata/searchcontacts?/?', routes.views.searchcontacts);
	app.get('/analytics/actiondata/deletecontact?/?', routes.views.deletecontact);	
};
