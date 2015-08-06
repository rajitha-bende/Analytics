//require('newrelic');
var keystone = require('keystone')
    , os = require('os')
    , express = require('express')
    , MongoStore = require('connect-mongo')(express)
    , mongoDatabase = require('./lib/mongoDb')
    //, authentication = require('./routes/services/authentication')
    , applicationSockets = require('./lib/sockets')
    , cjson = require('cjson');

var configuration = cjson.load('./configuration');


var nodeServer = returnServer(configuration.application.server.host);
var mongoServer = returnServer(configuration.application.mongo.host);

var websockets = configuration.application.websockets;
websockets.host = returnServer(websockets.host);

function returnServer(host){
	return (host && host.trim() != "") ? host : os.hostname();
}

var dbName = configuration.application.mongo.databases.application
    , sessionSecret = configuration.application.session.secret
    , sessionKey = configuration.application.session.key
    , sessionStore = new MongoStore(
		{ url: 'mongodb://' + mongoServer + ':' + configuration.application.mongo.port + '/' + configuration.application.mongo.databases.session }
	);

var keystoneConfigurationObject = configuration.application.keystone;
keystoneConfigurationObject.server = nodeServer;
keystoneConfigurationObject.protocol = configuration.application.server.protocol;
keystoneConfigurationObject.port = configuration.application.server.port;
keystoneConfigurationObject.sslOptions = configuration.application.server.certificateLocation;
keystoneConfigurationObject.url = configuration.application.server.url;
keystoneConfigurationObject.dirname = __dirname;
keystoneConfigurationObject['session information'] = {
	secret : sessionSecret ,
	key : sessionKey ,
	store: sessionStore
};
keystoneConfigurationObject.url = configuration.application.server.url;
keystoneConfigurationObject.roles = configuration.application.urls.roleSecured;
keystoneConfigurationObject.mongo =  'mongodb://' + mongoServer + '/' + configuration.application.mongo.databases.keystone;
//keystoneConfigurationObject.auth = authentication.applicationAuth;
keystoneConfigurationObject.websockets = websockets;

var regExpString = "";
for(var i=0; i<configuration.application.urls.public.length; i++){
	regExpString += '(?=^\/((?!' + configuration.application.urls.public[i] + '(\/+|$)).)*$)';
}

var regExp = new RegExp(regExpString);
keystoneConfigurationObject['protected folders'] = [regExp];

keystoneConfigurationObject.flickmiConfiguration = configuration;

keystone.init(keystoneConfigurationObject);

keystone.set('routes', require('./routes'));

require('./models');
keystone.set('nav',{
	'admin' : ['users']
});

//Custom Flickmi code
var mongoRequirements = { 'dbServer' : mongoServer , 'dbName' : dbName };
mongoDatabase.connect( mongoRequirements , function (error) {
    if (error)
        throw error;
});
keystone.start( function(error){
    var socketReq = {'sessionKey' : sessionKey , 'sessionSecret' : sessionSecret , 'sessionStore' : sessionStore, 'io' : keystone.get('io') };
    applicationSockets.init( socketReq , function ( error ) {
        if (error)
            throw error;

        keystone.set('applicationSockets', applicationSockets);
    });
});
