import express from 'express'
import signOut from  '../../../controllers/auth/signOut/index.js'

const router  = express.Router()

router.get('/signOut' , signOut) 

export default router