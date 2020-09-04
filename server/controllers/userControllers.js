const HttpError = require('../models/http-error');
const User = require('../models/user');


const signup = async (req, res, next) => {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    user.save()
    .then(() => {
        res.status(201).json({user});
    })
    .catch(error => {
        const err = new HttpError(error, 500);
        return next(err);
    })
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
  
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        403
      );
      return next(error);
    }
  
    let isValidPassword = false;
    /*
    try {
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
      const error = new HttpError(
        'Could not log you in, please check your credentials and try again.',
        500
      );
      return next(error);
    }
    */

    if (password == existingUser.password) isValidPassword = true;
  
    if (!isValidPassword) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        403
      );
      return next(error);
    }
    
    /*
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        'supersecret_dont_share',
        { expiresIn: '1h' }
      );
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
    */
  
    res.json({
      userId: existingUser._id,
      email: existingUser.email,
      //token: token
    });
  


   // res.json({message: "Successful connection to login existing user"});
};

exports.signup = signup;
exports.login = login;

