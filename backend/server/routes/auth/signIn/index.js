import express from 'express'
import signIn from  '../../../controllers/auth/signIn/index.js'

const router  = express.Router()

router.post('/signIn', signIn) 

export default router