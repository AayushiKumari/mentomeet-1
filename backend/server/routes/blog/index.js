import express from 'express'
//import blogController from  ''post_blog_create,post_blog_update,
import {get_blog_create,allBlogs,post_blog_create,post_blog_update,blog_list, blog_detail,isquerypresent,
get_blog_update, get_blog_delete, post_blog_delete,post_comment_onBlog,post_upvote_blog,post_upvote_comment,
getBlogById, blogViews, commentOnBlog, blogLikes, blog_list_count, getBlogByCategory, getBlogByTag, LikedBlog} 
from './../../controllers/blogController.js'
import multer from "multer"
const router  = express.Router()
import {blogValidator,commentValidator} from '../../helpers/validators/blogValidator/index.js'
//authorizers
//import {isAuth} from '../../helpers/authorizers/index.js'
import authorizer from '../../helpers/authorizers/index.js'
//router.get('/blog',get_blog_create);no use 
//router.get('/blogs/:id/delete',get_blog_delete);

// author:{type: Schema.Types.ObjectId, ref: 'User'}, //* make it require
//   author_name:{type: String, maxlength: 100 ,trim:true},
//   title: { type: String, required: true, maxlength: 100 },//*
//   body_text: { type: String, required: true, maxlength: 10000000 }, //*
//   body_image: { type: String,default:""},//need buffer for image,will add image
//   tag:{ type: String, default:'EXAM',enum:['PHYSICS','CHEMESTRY','MATHS','PCM','PCB','BIOLOGY','JEE-EXAM',
//   'JEE-ADVANCED','AIIMS','NEET-EXAM','EXAM','JEE-11','JEE-12','JEE-DROPPER','NEET-DROPPER','DEV-BLOG' ]},
//   //tag is broader than category and for now to make it easy only one tag we can add most appropriate.
//   created_at: { type: Date, default: Date.now() },
//   category: { type: String, default:'JEE', enum: ['CAREER','JEE','NEET','DEVELOPMENT']},//ie. category jee,neet,webd,career counseling
//   minute_read: { type: Number, min: 0,max: 60,default:5},

//   verification_status: { type: Boolean,  default: false,},//upvote will be handled in seprate document,for now ok
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname)
    },
   // onFileUploadStart: file => !file.mimetype.match(/^image\//),
    limits: {
     fileSize: 1024 * 1024 * 5   // 5 MB
    }
})
var upload = multer({
    storage: storage
})

router.post('/blog', upload.single('file'),  authorizer(),blogValidator, post_blog_create);
//requred(title,body_text,category) optional(body_image,tag,minute_read),need authenticate



router.get('/blogs',isquerypresent,blog_list); 
 
//get all blog category wise

// router.get('/blogs/:id',blog_detail)
//blog detail

router.get('/blogs/:id/update',get_blog_update);
//get past blog details and upa what you want to

router.post('/blogs/:id/update',blogValidator,post_blog_update);
//post blog update ,need to authenticate

router.post('/blogs/:id/delete',post_blog_delete);
//post blog delete ,need to authenticate

router.post('/blogs/:id/comment',commentValidator,post_comment_onBlog)
//location(blogController,blogValidator)
//to make comments on blog ,fields(body(string),modelId(req.params.id))


router.post('/blogs/:id/upvoteBlog',post_upvote_blog)
//location(blogController,blogValidator)
//upvote blog  fields(user(req.user),blog(req.params.id)) 

router.post('/blogs/:blogId/:commentId/upvoteComment',post_upvote_comment)
//location(blogController,blogValidator)
//upvote comment field(user(req.user),comment(req.params.commentId))

router.get('/blogs/count/',blog_list_count);
router.get('/allblogs', allBlogs); 
router.get('/blogs/liked/', LikedBlog); 
router.get('/blogs/:category', getBlogByCategory); 
router.get('/blogs/tag/:tag', getBlogByTag); 
router.get('/blog/:bid', getBlogById)
router.get('/blog/view/:bid', getBlogById)
router.post('/blog/comment/:bid', commentOnBlog)
router.put('/blog/likes/', authorizer(), blogLikes)
router.put('/blog/views/', authorizer(), blogViews)



export default router