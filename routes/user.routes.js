/** @format */

import express from 'express';
import {
  getSignupUserForm,
  signupUser,
  getSigninUserForm,
  signinUser,
} from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/signup', getSignupUserForm);
router.post('/signup', signupUser);
router.get('/signin', getSigninUserForm);
router.post('/signin', signinUser);

export default router;
