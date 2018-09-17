var mongoose = require("mongoose");
var bcrypt = require('bcrypt');


// Should we create a new model for creators?
// Where do we store Popularity, money, ongoing bids, etc?
var UserSchema = mongoose.Schema({
    //If they are content creator or absorber
    userStatus: {
        type: Boolean,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});

UserSchema.statics.findByStatus = function(status, func) {
    return this.find({ userStatus: status}, func);
  }

UserSchema.statics.findUserByUsername = function(username, func){
	return this.findOne({username: username},func);
}


var User = module.exports = mongoose.model("User", UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
