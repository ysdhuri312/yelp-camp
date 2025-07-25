/** @format */

import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError.js';
import catchAsyncError from '../utils/catchAsyncError.js';

export const generateToken = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const isLoggedIn = catchAsyncError(async (req, res, next) => {
  const token = req.session.userId;

  if (!token) {
    res.locals.isAuthenticated = false;
    req.flash('error', 'Must be signed in first');
    res.redirect('/userl/signin');
    return new CustomError(403, 'Must be signed in first');
  }

  if (token) {
    var decoded = await jwt.verify(token, 'thisissecret');
    const verifyToken = jwt.verify(
      token,
      'thisissecret',
      function (err, decoded) {
        return true;
      }
    );

    if (verifyToken) {
      res.locals.isAuthenticated = true;
      return next();
    } else {
      res.locals.isAuthenticated = true;
      return new CustomError(403, 'Must be signed in first');
    }
  }
});
