var bcrypt = require('bcryptjs');

function hashPassword(password) {
	var promise = new Promise(function(resolve, reject) {
		bcrypt.genSalt(10, function(err, salt){
			if(err) {
				reject(Error(err));
			} else {
				bcrypt.hash(password, salt, function(err, hash){
					if(err) {
						reject(Error(err));
					} else {
	 					resolve(hash);
					}
				});
			}
		});
	});
	return promise;
}

function compareHash(password, expected, callback){
	bcrypt.compare(password, expected, function(err, compare){
		callback(compare);
	});
}

module.exports.hashPassword = hashPassword;
module.exports.compareHash = compareHash;
