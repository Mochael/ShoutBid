var mongoose = require("mongoose");

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
    },
    passwordConfirm: {
        type: String,
        required: true
    }
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
