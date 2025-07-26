const express = require('express');
const { crmSync } = require('../controllers/crm-controller');
const verifyApiKey = require('../middlewares/verifyApiKeys');
const router = express.Router();

router.post('/crm-sync' ,verifyApiKey ,crmSync );

module.exports = router;