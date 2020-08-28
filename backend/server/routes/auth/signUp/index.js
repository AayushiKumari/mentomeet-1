import express from 'express'
import signUp from  '../../../controllers/auth/signUp/index.js'
import Validator from '../../../helpers/validators/auth/signUpValidators/index.js'

const router  = express.Router()

router.post('/signUp',Validator,signUp) //added validator middleware for parameters verifications

export default router