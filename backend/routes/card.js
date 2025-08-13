const authMiddleware = require('../middleware/authMiddleware')
const {addCart, getCart, removeCart} = require('../controller/cartController')
const express = require('express')
const router = express.Router()

//user can cart the product 
router.post('/add',authMiddleware, addCart)
router.get('/:userId',authMiddleware, getCart)
router.delete('/:productId',authMiddleware, removeCart)

module.exports = router