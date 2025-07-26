const express = require('express');
const router = express.Router();
const { getTransactions } = require('../controllers/transaction-controller');

router.get('/transactions', getTransactions);

module.exports = router;
