var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(done) {
    new User.model({
        name: { first: 'Aaren', last: 'Tebbutt' },
        email: 'aaren.tebbutt@hedloc.com.au',
        password: 'password',
        canAccessKeystone: true
    }).save(done);

    new User.model({
        name: { first: 'Matthew', last: 'Dunkerley' },
        email: 'matthew.dunkerley@hedloc.com.au',
        password: 'password',
        canAccessKeystone: true
    }).save(done);
}
