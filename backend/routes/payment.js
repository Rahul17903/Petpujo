const express = require('express')
const router = express.Router()
const {verifyPayment, createOrder} = require('../controller/paymentController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/order',authMiddleware, createOrder)
router.post('/verify',authMiddleware, verifyPayment)

module.exports = router 