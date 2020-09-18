const HttpError = require('../models/http-error');
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
  
  let existingUser;
  existingUser = await User.findOne({ email: req.body.email });
     
  if (existingUser) {
    const error = new HttpError(
      'There is already an account with this email',
      403
    );
    return next(error);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      image: req.file.path
  })

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      'Sign up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user._id, email: user.email },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Sign up failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ _id: user._id, username: user.username, email: user.email, image: user.image, token: token });
};

    
const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email);

    let existingUser;
    existingUser = await User.findOne({ email: email });
   
     
    if (!existingUser) {
      const error = new HttpError(
        'No account exists with this email',
        403
      );
      return next(error);
    }
  
    let isValidPassword = false;
    
    isValidPassword = await bcrypt.compare(password, existingUser.password);
      
    if (!isValidPassword) {
      const error = new HttpError(
        'Incorrect credentials, could not log you in.',
        403
      );
      return next(error);
    }
    
    
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
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
    
  
    res.json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      image: existingUser.image,
      token: token
    });
    
};

exports.signup = signup;
exports.login = login;

