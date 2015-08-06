var mongoDatabase = require('../../lib/mongoDb')
    , pbkdf2 = require('../../lib/pbkdf2')
    , smtp = require('./smtp')
    , keystone = require('keystone')
    , flashUtils = require('../../lib/flash-message-utils')
    , fs = require('fs');

function returnNewAccount(email,telephone,name,authDetails){
    return{
        username : email,
        emails : [{ _id: mongoDatabase.ObjectId() , value : email , verified : false }],
        name : name,
        phones : [{ _id: mongoDatabase.ObjectId() , value : telephone , verified : false }],
        password : authDetails,
        roles: ['user']
    }
}

function returnInitialPersona(initialContactDetails,personaColor){
    var contactDetails = new Array();

    for(var i = 0 ; i < initialContactDetails.length ; i++){
        contactDetails.push({
            detailId : initialContactDetails[i]._id,
            label : initialContactDetails[i].type
        })
    }

    return [
        {
            _id : mongoDatabase.ObjectId(),
            name: 'default',
            styles: personaColor,
            contactDetails : contactDetails
        }
    ]
}

function returnNewContactDetail(type, value){
    return {
        _id : mongoDatabase.ObjectId(),
        type: type,
        value: value
    }
}

function returnInitialSettings(defaultPersona){
    return {
        "contacts" : {
            "default" : {
                "sort": "name",
                "filter": ""
            }
        },
        "personas": {
            "default":{
                "persona": defaultPersona
            }
        }
    }
}

var create = exports.create = function( req , res , next ){
	var data = JSON.parse(req.params.data);

	var validPassword = pbkdf2.validPasswordAndLength(data.password);

	if(data.token == 'BMAS +61 2 9252 9000' && validPassword){
		mongoDatabase.usersCollection.findOne( { 'account.username' : data.email } , {} ,function( e , docs ){
			if(docs){
				res.send({ 'message' : 'Invalid form submission' , type : 'warning' });
			} else {
				pbkdf2.generatePassword( data.password ,function( authDetails , response ){

					var email = data.email;
					var name = { given: data.given , family: data.family};
					var telephone = data.mobile;

					var account = returnNewAccount(email,telephone,name,authDetails);

					var personaConfiguration = keystone.get('flickmiConfiguration').persona;

					var t = { number : telephone};
					var e = { address : email};

					var contactDetails = [
						returnNewContactDetail('NAME',name)
						, returnNewContactDetail('TEL',t)
						, returnNewContactDetail('EMAIL',e)
					];

					var personas = returnInitialPersona(contactDetails , personaConfiguration.availableColors[0]);
					var settings = returnInitialSettings(personas[0].name);

					mongoDatabase.usersCollection.insert( {
						account: account,
						contactDetails: contactDetails,
						contacts : [],
						images: [],
						personas: personas,
						settings: settings,
						notifications: new Array()
					} ,function( err , docs ){
						if(err)
							onFail(flashUtils.newMessage('Account Error','There was an error in the account creation'));

						var locals = {
							emailAddress : email,
							name : name.given + ' ' + name.family,
							link : keystone.get('url') + 'verify/' + docs[0]._id + '/' + account.emails[0]._id
						};

						var mailOptions = {
							from: 'accounts@flickmi.com.au',
							to: locals.emailAddress,
							subject:  'Flickmi Email Verification'
						};

						var sendOptions = {
							templateName : 'createaccount',
							mailOptions : mailOptions,
							locals : locals
						};

						smtp.send( sendOptions ,function( status , response ){ });

						var usrImgDir = keystone.get('userImageFolder') + docs[0]._id;

						fs.exists(keystone.get('userImageFolder'), function (exists) {
							if(!exists){
								fs.mkdir(keystone.get('userImageFolder'), function (err) {
									if (err) throw err;
									makeUserDir(usrImgDir);
								});
							}else {
								makeUserDir(usrImgDir);
							}
						});

						res.send({ 'message' : 'Your account has been created', type : 'success' });

					});
				});
			}
		});
	} else {
		if (!validPassword)
			res.send({ 'message' : 'Password is not strong enough' , type : 'warning' });
		else
			res.send({ 'message' : 'Access Denied' , type : 'warning' });
	}
};

function makeUserDir(usrImgDir){
	fs.exists(usrImgDir, function (exists) {
		if(!exists){
			fs.mkdir(usrImgDir, function (err) {
				if (err) throw err;
			});
		}
	});
}

var resetPassword = exports.resetPassword = function( req , res, onSuccess, onFail ){
    mongoDatabase.usersCollection.findOne( { 'username' : req.body.accountEmail }, {} ,function( e , docs ){
        if(docs){
            onSuccess(flashUtils.newMessage('Reset Password Success','You will recieve an email to your account'));
        } else {
            onFail(flashUtils.newMessage('Reset Password Failed','Please contact flickmi for more information'));
        }
    });
};

var verify = exports.verify = function( req , res ){
    var matchJson = {};
    matchJson['_id'] = mongoDatabase.ObjectId(req.params.id);
    matchJson['account.emails._id'] = mongoDatabase.ObjectId(req.params.item) ;

    var updateObj = {};
    updateObj['account.emails.$.verified'] = true;

    var updateJson = { '$set': updateObj };

    mongoDatabase.usersCollection.update( matchJson , updateJson  ,function( e , docs ){
        res.redirect('/login/');
    });
};