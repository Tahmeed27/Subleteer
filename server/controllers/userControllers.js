const User = require('../models/user');


const signup = async (req, res, next) => {
    res.json({message: "Successful connection to signup new user"});
};

const login = async (req, res, next) => {
    res.json({message: "Successful connection to login existing user"});
};

exports.signup = signup;
exports.login = login;

