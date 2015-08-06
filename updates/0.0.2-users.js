var keystone = require('keystone'),
	User = keystone.list('User');

exports = module.exports = function(done) {
	new User.model({
		name: { first: 'Sonny', last: 'Lau' },
		email: 'sonny.lau@hedloc.com.au',
		password: 'password',
		canAccessKeystone: true
	}).save(done);

}
