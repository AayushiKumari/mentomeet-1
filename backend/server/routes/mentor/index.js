import express from 'express'
import {mentorValidator,mentorReviewValidator} from '../../helpers/validators/mentorValidator/index.js'
import {get_mentor_create,post_mentor_create,post_mentor_update,mentor_list, mentor_detail,isquerypresent,
    get_mentor_update, get_mentor_delete, post_mentor_delete,post_mentor_review,post_follow_mentor} 
    from './../../controllers/mentorController.js'
const router  = express.Router()


//router.get('/mentor',get_mentor_create);
//router.get('/mentors/:id/delete',get_mentor_delete);

// user:{type: Schema.Types.ObjectId, ref: 'User'},//set require true
//   first_name: { type: String,  maxlength: 100 ,trim: true},//set required: true,
//   last_name: { type: String,  maxlength: 100 ,trim:true},//set required: true,
//   profile_picture: { type:String,},
//   phone: { type: Number,min:999999999,  max:10000000000},
//   branch:{type: String, maxlength:100,trim:true},
//   email:{ type: String, maxlength: 100,trim:true},//already taken during account creation
//   college: { type: String, required: true, maxlength: 200 },
//   year: { type: Number,  min: 1,required: true},
//   college_type: { type: String,default:"IIT",enum:['IIT','NIT','AIIMS','IIIT','OTHER']},
//   category: { type: String, default:'JEE', enum: ['CAREER','JEE','NEET','DEVELOPMENT'],trim:true},//ie. category jee,neet,webd,career counseling
//   rank: { type: Number, min: 1 },
//   badge:{ type: String,default:'general',enum:['general','bronge','slver','gold']},//based on performance
//   fb_link: { type: String, },// dictionary for urls
//   expertise: { type: Array, max:4, default:['Counselling']},
//   linkedin_link:{ type: String,},
//   language: { type: Array, max:3,default: ['English']},
//   start_time: { type: String, maxlength: 100,required: true},
//   end_time: { type: String, maxlength: 100,required: true},
// //documents for verifying
//   college_id: { type: String, },//file field make  required: true
//   resume:{ type: String},//file
// //dynamic  attribytes,need fxns
//   verification_status: { type: Boolean, default: false },//account verification,only admin can change status 
//   call_count: { type: Number, default:0 },

router.post('/mentor',mentorValidator,post_mentor_create);//CreateMentorPostRequestHandler
// req field(first_name,last_name,year,college_type,college,category,language,availability_time(string for now)) optional(about me,rank,social_media_urls,expertise,college_id(fileFild),resume(fileField))

router.get('/mentors',isquerypresent,mentor_list);
//to get all mentors

router.get('/mentors/:id',mentor_detail)
//individual mentor details

router.get('/mentors/:id/update',get_mentor_update);
//get mentor details to what to update

router.post('/mentors/:id/update',mentorValidator,post_mentor_update);
//post mentor update 

router.post('/mentors/:id/delete',post_mentor_delete);
//post mentor delete

router.post('/mentors/:id/mentorReview',mentorReviewValidator,post_mentor_review);
//location mentor controller,validator
//req fields(feedback(string),stars(1-5),mentor(req.params.id),user(req.user))
//mentor:req.params.mentorId,mentee:req.params.menteeId,feedback: req.body.feedback,stars:req.body.stars,
                   
                   
router.post('/mentors/:id/followMentor',post_follow_mentor);
//location mentor controller,validator
//req fields(mentor(req.params.id),user(req.user))

export default router

