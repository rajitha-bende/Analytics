var mongodb = require('mongodb');

module.exports.connect = function ( mongoReq , callback ) {
    var dB = mongodb.Db;
    var Server = mongodb.Server;
    var ObjectId = mongodb.ObjectID;
    var dbServer = mongoReq.dbServer;
    var dbName = mongoReq.dbName;

    var db = new Server(dbServer, 27017, {});
    new dB(dbName, db, {w: 1}).open(function (error, client) {
        console.log(error);
        module.exports.ObjectId = ObjectId;
        module.exports.usersCollection = mongodb.Collection(client, 'users');
        module.exports.personasCollection = mongodb.Collection(client, 'personas');
        module.exports.unregisteredUsersCollection = mongodb.Collection(client, 'unregisteredusers');
        module.exports.feedbackCollection = mongodb.Collection(client, 'feedback');
        callback(error);
    });

	module.exports.dbError = function dbError(res,error,consoleMessage,response,userMessage){
		if(error){
			console.log(consoleMessage);
			console.log(error);
			res.send(response, userMessage);
			return;
		}
	}
};
