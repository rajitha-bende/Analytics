var mongoDatabase = require('../../lib/mongoDb')
	applicationSockets = require('../../lib/sockets')
    , pbkdf2 = require('../../lib/pbkdf2')
    , keystone = require('keystone')
    , flashUtils = require('../../lib/flash-message-utils')
    , _ = require('underscore');


function isAccountValid(contactMethodArray){
    var accountValidated = false;
    for(var i=0; i<contactMethodArray.length; i++){
        if (contactMethodArray[0].verified){
            accountValidated = true;
            break;
        }
    }

    return accountValidated;
}

var login = exports.login = function(req, res, onSuccess, onFail) {
        mongoDatabase.usersCollection.findOne({'account.username':req.body.username },{'personas' : 1, 'account' : 1 , '_id' : 1 },function( e , docs ){
            if (docs){
                var account = docs.account;

                var authDetails = { 'password' : req.body.password , 'salt' : account.password.salt };
                pbkdf2.encryptedPassword( authDetails ,function( derivedKey , response ){

                    var accountValidated = isAccountValid(account.emails) ? true : isAccountValid(account.phones);

                    if (!accountValidated) {
                        onFail(flashUtils.newMessage('Account','Account Not Validated'));
                    } else if(derivedKey == account.password.derivedKey ){
                        var personasList = new Array();

                        for(var i=0; i<docs.personas.length; i++){
                            personasList.push(docs.personas[i].name);
                        }
                        authenticatedUser(docs._id,account.roles,personasList);

                    } else if (derivedKey != account.password.derivedKey) {
                        onFail(flashUtils.newMessage('Password/Username','Incorrect password and/or username'));
                    }
                });
            } else {
                onFail(flashUtils.newMessage('Password/Username','Incorrect password and/or username'));
            }
        });

        var authenticatedUser = function(user,roles,personasList) {
            req.session.regenerate(function() {
                req.session.uid = user;
                req.session.roles = roles;
                req.session.personasList = personasList;

				req.session.expires = generateSessionExpires(req.body.sessionExpires);
				req.session.cookie.expires = generateSessionExpires(req.session.expires);
				req.session.page = '/';

				console.log(req.session.cookie.expires);

                res.cookie('userId', user);
                onSuccess();
            });
        }
};

function generateSessionExpires(sessionExpires){
	return sessionExpires ? new Date(Date.now() + ((3600000 * 24) * 7)) : false;
};

//A function to logout the user and clear their session
var logout = exports.logout = function(req, res, next) {
	delete applicationSockets.users[req.session.uid];

	res.clearCookie('userId');
	req.session.uid = null;

    req.session.regenerate(function() {
        res.redirect('/login');
    });
}

//A basic function to check authorisation to deliver different pages
var isAuthenticated = exports.isAuthenticated = function(req) {
    return (req.session.uid) ? true : false;
}

//A function to check the authentication
function authorisationCheck(req){
    if(keystone.get('roles').admin){
        for(var i=0; i<keystone.get('roles').admin.length; i++){
            if(req.url.indexOf(keystone.get('roles').admin[i]) === 0) {
                if(req.session.roles.admin)
                    return true;
                else
                    return false;
            }
        }
    }

    return true;
}

//checks if the user is logged in and the authorisation/authentication (for users that go to the URL)
exports.applicationAuth = function(req, res, next) {
    if (req.session.uid){
        if(authorisationCheck(req))
            next();
        else
            res.redirect('/');

    } else
        return res.redirect('/login/');

}

//Alloes the programmer to update the session variables and maintain the session.
var regenerateSession = exports.regenerateSession = function(req, res, next, newSession){
    req.session.regenerate(function() {
        req.session.uid = newSession.uid;
        req.session.roles = newSession.roles;
		req.session.cookie.expires = req.session.expires;
		req.session.page = newSession.page;
		res.cookie('userId', newSession.uid);
        res.end();
    });
}