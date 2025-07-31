/** @format */

import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import CustomError from '../utils/CustomError.js';
import catchAsyncError from '../utils/catchAsyncError.js';
import { generateToken } from '../middlewares/auth.js';

// Sign-up user form
const getSignupUserForm = catchAsyncError((req, res, next) => {
  res.render('user/signup');
});

// Sign-up user
const signupUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return new CustomError(400, 'All fields are required.');
  }

  const isExist = await User.findOne({ email });

  console.log(isExist);
  if (isExist) {
    req.flash('error', 'User already ragister');
    res.redirect('/user/signup');
    return new CustomError(409, 'User already ragister');
  }

  // if I use callback in bcrypt.hash() for error the we gave error
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashedPassword });
  req.flash('success', 'User register successfully');
  res.render('user/signin');
});

// Sign-up user form
const getSigninUserForm = catchAsyncError((req, res, next) => {
  res.render('user/signin');
});

// Sign-in user
const signinUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // const isAuthenticated = true;
  if (!email || !password) {
    return new CustomError(400, 'All fields are required.');
  }

  const user = await User.findOne({ email });
  if (!user) {
    req.flash('error', 'User not ragister');
    res.redirect('/user/signup');
    return new CustomError(409, 'User not ragister');
  }

  // if I use callback in bcrypt.compare() for error the we gave error
  const comparePassword = await bcrypt.compare(password, user.password);

  if (email !== user.email || !comparePassword) {
    req.flash(
      'error',
      'Authentication failed due to a user credentials mismatch'
    );
    res.redirect('/user/signin');
    return new CustomError(
      401,
      'Authentication failed due to a user credentials mismatch',
      'SigninUser'
    );
  }

  // if I use callback in jwt.sign for error the we gave error
  const signToken = await generateToken(
    { id: user._id },
    process.env.JWT_SECRET
  );
  req.session.userId = signToken;

  req.flash('success', 'Welcome Back');
  res.redirect('/campground/all');
});

// Sign out user
const signoutUser = catchAsyncError((req, res, next) => {
  req.session.userId = null;
  req.flash('success', 'User sign out sucessfully');
  res.redirect('/campground/all');
});

export {
  getSignupUserForm,
  signupUser,
  getSigninUserForm,
  signinUser,
  signoutUser,
};
