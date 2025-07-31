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
    res.redirect('/user/signin');
    return new CustomError(403, 'Must be signed in first');
  }

  if (token) {
    var decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err, decoded) {
        return true;
      }
    );

    if (verifyToken) {
      res.locals.isAuthenticated = true;
      req.userId = decoded.id;
      next();
    } else {
      res.locals.isAuthenticated = false;
      return new CustomError(403, 'Must be signed in first');
    }
  }
});
