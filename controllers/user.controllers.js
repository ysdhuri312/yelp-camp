/** @format */

import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import CustomError from '../utils/CustomError.js';
import catchAsyncError from '../utils/catchAsyncError.js';

const getSignupUserForm = catchAsyncError((req, res, next) => {
  res.render('user/signup');
});

// Sign-up user
const signupUser = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return new CustomError(400, 'All fields are required.', 'SignupUser');
  }

  const isExist = await User.findOne({ email });

  console.log(isExist);
  if (isExist) {
    req.flash('error', 'User already ragister');
    res.redirect('/user/signup');
    return new CustomError(409, 'User already ragister', 'SignupUser');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashedPassword });
  req.flash('success', 'User ragister successfully');
  res.redirect('/user/signin');
});

const getSigninUserForm = catchAsyncError((req, res, next) => {
  res.render('user/signin');
});

// Sign-in user
const signinUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return new CustomError(400, 'All fields are required.', 'SigninUser');
  }

  const user = await User.findOne({ email });
  if (!user) {
    req.flash('error', 'User not ragister');
    res.redirect('/user/signup');
    return new CustomError(409, 'User not ragister', 'SigninUser');
  }

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

  req.flash('success', 'Welcome Back');
  res.redirect('/campground/all');
});

export { getSignupUserForm, signupUser, getSigninUserForm, signinUser };
