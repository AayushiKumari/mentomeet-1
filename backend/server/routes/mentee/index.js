import express from 'express'
import menteeValidator from '../../helpers/validators/menteeValidator/index.js'
import {get_mentee_create,post_mentee_create,post_mentee_update,mentee_list, mentee_detail,
    get_mentee_update, get_mentee_delete, post_mentee_delete} 
    from './../../controllers/menteeController.js'
import authorizer from '../../helpers/authorizers/index.js'
    
const router  = express.Router()
//router.get('/mentee',get_mentee_create)

// user:{type: Schema.Types.ObjectId, ref: 'User',},//* make required: true
// mentor:[{type: Schema.Types.ObjectId, ref: 'Mentor',}],//* set required: true} mentee can contact with many mentors
// //personal details
// first_name: { type: String, required: true, maxlength: 100 ,trim: true},//*
// last_name: { type: String, required: true, maxlength: 100 ,trim:true}, //*
// phone: { type: Number,min:999999999,  max:1000000000},
// email: { type: String,maxlength: 100 ,trim:true},
// coaching:{type: String, maxlength: 100,required: true},//*
// class: { type: Number,required: true , min: 1,max:12,},//*  
// category: { type: String, default:'JEE', enum: ['CAREER','JEE','NEET','DEVELOPMENT']}, //*//equired: true,ie.r category jee,neet,webd,career counseling
// subject: { type: String, default:'PCM', enum: ['PHYSICS','MATHS','CHEMESTRY','BIOLOGY','PCM','PCB']},
// need_notes: { type:Boolean, default: false},
router.get('/mentees',mentee_list)
//to get all mentees
//,authorizer()
router.put('/mentee/:id',post_mentee_create)
//req(first_name,last_name,coaching,class,category,subject)optional(phone,email,need_notes)

router.get('/mentees/:id',mentee_detail)
//individual mentee

router.get('/mentees/:id/update',get_mentee_update)
//get mentee details to update mentee

router.put('/mentees/:id/update',menteeValidator,post_mentee_update)
//post mentee update

//router.get('/mentees/:id/delete',get_mentee_delete) //no need of this for

router.post('/mentees/:id/delete',post_mentee_delete)
//delete mentee post request


export default router