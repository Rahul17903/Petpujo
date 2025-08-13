const {register, login, getPic, getName} = require('../controller/userController')
const multer = require('multer')
const express = require('express')
const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage });

//User authentication
router.post('/login',login)
router.post('/register',upload.single("pic"), register)
router.get('/user/:id/pic',getPic)
router.get('/user/:id',getName)


module.exports = router