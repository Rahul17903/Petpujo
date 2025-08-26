import express from 'express'
import {viewComplaint, postComplaint} from '../controllers/complainController.js'
const  router =  express.Router()

router.post('/',postComplaint)
router.get('/',viewComplaint)

export default router