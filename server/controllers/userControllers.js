const HttpError = require('../models/http-error');
const User = require('../models/user');


const signup = async (req, res, next) => {
    res.json({message: "Successful connection to signup user"});


    // let user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // user.save()
    // .then(() => {
    //     res.status(201).json({user});
    // })
    // .catch(error => {
    //     const err = new HttpError(error, 500);
    //     return next(err);
    // })
};

const login = async (req, res, next) => {
    res.json({message: "Successful connection to login existing user"});
};

exports.signup = signup;
exports.login = login;

