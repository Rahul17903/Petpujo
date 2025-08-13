const authMiddleware = require('../middleware/authMiddleware')
const {createOrder, allOrder} = require('../controller/orderController')
const express = require('express')
const router = express.Router()

router.post('/',authMiddleware, createOrder)
router.get('/allorder',authMiddleware, allOrder)

module.exports = router