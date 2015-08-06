var cookie = require('cookie');
var connect = require('connect');
var mongodb = require('mongodb');
var mongoDatabase = require('./mongoDb');
var users = {};

module.exports.init = function ( socketReq , callback ) {   
    var sessionKey = socketReq.sessionKey;
    var sessionSecret = socketReq.sessionSecret;
    var sessionStore = socketReq.sessionStore;
    var io = socketReq.io;

    var uid = '';
    var sockets;

    io.set('authorization', function (handshakeData, accept) {
            if (handshakeData.headers.cookie) {
    
                    handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
                    console.log('connection: handshakeData.cookie - ', handshakeData.cookie);
    
                    handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie[sessionKey], sessionSecret);
                    console.log('handshakeData.sessionID', handshakeData.sessionID);
                    console.log('handshakeData.cookie[sessionKey]', handshakeData.cookie[sessionKey]);
    
                    if (handshakeData.cookie[sessionKey] == handshakeData.sessionID) {
                            return accept('Cookie is invalid.', false);
                            callback('Cookie is invalid.', false);
                    }
    
            } else {
                    return accept('No cookie transmitted.', false);
                    callback('No cookie transmitted.', false);
            }
            
            module.exports.sessionID = handshakeData.sessionID;
            sessionStore.get(handshakeData.sessionID, function (err, session) {
                    uid = session.uid
                    module.exports.uid = session.uid;
                    mongoDatabase.usersCollection.update( {'_id' : mongoDatabase.ObjectId(session.uid) } ,  { $set : { 'active' : 'online' }} , function( e , docs ){ });      
            });
            
            accept(null, true);
            callback(null);
    });
    
    sockets = io.sockets;
    
    io.sockets.on('connection', function (socket) {
            console.log('connection: handshake session id - ', socket.handshake.sessionID);
            socket.on('connect', function () {
				users[uid] = socket.id;
				console.log('-----------connect------------');
				console.log('users[uid]=' + users[uid]);
				console.log('uid=' + uid);
				console.log('-----------connect------------');
            });

			socket.on('disconnect', function () {
				if(typeof users[uid] != 'undefined')
					delete users[uid];;
			});
    });
    
    module.exports.sockets = sockets;
    module.exports.io = io;
    module.exports.users = users;
};