const express = require('express');
const authControl = require('../Controllers/authControl');
const router = express.Router();

//POST ROUTES
router.post('/signup' , authControl.postSignup);
router.post('/login' , );


//GET ROUTES
router.get('/signup', authControl.getSignup);
router.get('/login' , authControl.getLogin);


module.exports = router;
