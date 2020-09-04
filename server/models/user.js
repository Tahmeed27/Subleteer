const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true}, // Name of user
    email: {type: String, required: true, unique: true}, // Email of user
    password: {type: String, required: true, min: 8}, // Password of user
});


module.exports = mongoose.model('User', userSchema);