const express = require('express');
const router = express.Router();
const homeControl = require('../Controllers/homeControl');
const isAuth = require('../middlewares/isAuth');


router.get('/' , homeControl.homeContol);

router.get('/codes' ,isAuth, homeControl.codes);

module.exports = router;