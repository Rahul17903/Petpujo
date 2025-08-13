const { addProduct, allProduct, getProduct, deleteProduct } = require('../controller/productController')
const authMiddleware = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')

//user and admin can create , delete, get and the product 
router.post('/add',authMiddleware, upload.single("image"), addProduct)
router.get('/',authMiddleware,  allProduct)
router.get('/:id',authMiddleware,  getProduct)
router.delete('/:id',authMiddleware,  deleteProduct)

module.exports = router