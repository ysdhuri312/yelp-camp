/** @format */

import express from 'express';
import {
  getSignupUserForm,
  signupUser,
  getSigninUserForm,
  signinUser,
  signoutUser,
} from '../controllers/user.controllers.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.get('/signup', getSignupUserForm);
router.post('/signup', signupUser);
router.get('/signin', getSigninUserForm);
router.post('/signin', signinUser);
router.get('/signout', isLoggedIn, signoutUser);

export default router;
