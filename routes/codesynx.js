const express = require('express');
const router = express.Router();
const synxControl = require('../Controllers/SynxControl');

router.get('/cs' , synxControl.newCs);

router.get('/:synxId', synxControl.codeSynx);


module.exports = router;