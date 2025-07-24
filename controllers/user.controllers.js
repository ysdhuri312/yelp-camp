/** @format */

const getSignupUserForm = (req, res, next) => {
  res.render('user/signup');
};

const signupUser = (req, res, next) => {};

const getSigninUserForm = (req, res, next) => {
  res.render('user/signin');
};

const signinUser = (req, res, next) => {};

export { getSignupUserForm, signupUser, getSigninUserForm, signinUser };
