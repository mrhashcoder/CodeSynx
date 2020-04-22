const express = require('express');
const authControl = require('../Controllers/authControl');
const isAuth = require('../middlewares/isAuth');
const isNotAuth = require('../middlewares/isNotAuth');

const router = express.Router();

//POST ROUTES
router.post('/signup', isNotAuth , authControl.postSignup);
router.post('/login' , isNotAuth , authControl.postLogin);
router.post('/logout', isAuth , authControl.postLogout);

//GET ROUTES
router.get('/signup',isNotAuth ,authControl.getSignup);
router.get('/login' ,isNotAuth ,authControl.getLogin);


module.exports = router;
