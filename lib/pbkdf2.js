var crypto = require('crypto')
    , saltIterations = 10000
	, mellt = require("./Mellt");;

exports.validPasswordStrength = validPasswordStrength;
exports.validPassword = validPassword;

exports.generatePassword = function( password , res ){
	var salt = "";
	
	crypto.randomBytes(128, function(err, buf) {
		salt = buf.toString('base64'); 
		crypto.pbkdf2( password , salt , saltIterations , 512 , function( err , derivedKey ) {
			res({ 'salt' : salt , 'derivedKey' : derivedKey.toString('base64')});
		});
	});
};

exports.encryptedPassword = function( authDetails , res ){
	crypto.pbkdf2( authDetails.password , authDetails.salt , saltIterations , 512 , function( err , derivedKey ) {
		res(derivedKey.toString('base64'));
	});
};

function validPasswordStrength( password ){
	return mellt.CheckPassword(password) >= 3 ? true : false;
};

function validPassword( password ){
	var measureStrength = function(p){
		var strength = 0;

		if (typeof p != 'undefined')
			for(var key in rules)
				strength += (rules[key](p));

		return strength;
	}

	var rules = {
		aNumber: function (password) {
			return (password.match(/[0-9]/)) ? 10 : 0;
		},
		upperCase: function (password) {
			return (password.match(/[A-Z]/)) ? 10 : 0;
		},
		lowerCase: function (password) {
			return (password.match(/[a-z]/)) ? 10 : 0;
		},
		specialCharacter: function(password){
			return (password.match(/[$-/:-?{-~!"^_`\[\]]/)) ? 10 : 0;
		},
		passwordLength: function (password) {
			return Math.min(password.length * 10,60);
		}
	}

	return measureStrength(password) > 80 ? true : false;
}

exports.validPasswordAndLength = function( password ){
	return (validPasswordStrength(password) && validPassword(password));
}