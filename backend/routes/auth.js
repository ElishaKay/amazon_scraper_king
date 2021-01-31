const express = require('express');
const router = express.Router();
const {
    signup,
    signin,
    signout,
    requireSignin,
    forgotPassword,
    resetPassword,
    preSignup,
    googleLogin
} = require('../controllers/auth');

// validators
const { runValidation } = require('../validators');
const {
    userSignupValidator,
    userSigninValidator,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../validators/auth');

const simpleOAuth2Facebook = require('@jimmycode/simple-oauth2-facebook');

router.post('/pre-signup', userSignupValidator, runValidation, preSignup);
router.post('/signup', signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);
// google login
router.post('/google-login', googleLogin);

const facebook = simpleOAuth2Facebook.create({
  clientId: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
});

// Ask the user to authorize.
router.get('/auth/facebook', facebook.authorize);

// Exchange the token for the access token.
router.get('/auth/facebook/callback', facebook.accessToken, (req, res) => {
  return res.status(200).json(req.token);
});

module.exports = router;
