import Blog from '../../database/models/Blog.js'
import Mentor from '../../database/models/Mentor.js'
import Mentor_review from '../../database/models/Mentor_review.js'
import Follow from '../../database/models/Follow.js'
import multer from 'multer'
import User from '../../database/models/users/index.js'

import async from 'async'

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
}).single('file')


//query for all mentors based on categoryalso for easyness only 1 query we are adding
//if no query than mentor_list view with all type mentors
export function isquerypresent (req, res, next) {
    if(!req.query.category) return next();    
    async.parallel({
            related_mentors: function (callback) {
                Mentor.find({category:req.query.category},'first_name last_name language expertise college year badge url ').sort({college_type:1})
                    .exec(callback)
            },//add another query if need                                
        }, function (err, results) {
            if (err) { return next(err); } // Error in API usage.
            if (results.related_mentors == null 
                ) { // No results.
                var err = new Error('Blogs not found');
                err.status = 404;
                return next(err);
            }
            res.send({related_mentors: results.related_mentors});
                });   
}




//so here we can get mentors(jee and neet seprate array) in order of IIIT,iit,NIT ,other and medical-AIIMS,OTHER so now we 
//can put them in order of (iit,nit,iiit,other and aiims,other)note here iiit first comes in array so exlude top  3 (max 3iiitian will have for now)
//later time we can sort them based on rank if we have to 
export function mentor_list (req, res, next) {
        async.parallel({
            jee_mentors: function (callback) {
                User.find({"history.category":"JEE",role:'Mentor'})
                    .exec(callback)
            },
            neet_mentors: function (callback) {
                User.find({role:'Mentor',"history.category":'NEET'})
                    .exec(callback)
            },
                                  
        }, function (err, results) {
            if (err) { return next(err); } // Error in API usage.
            if (results.jee_mentors == null ||results.neet_mentors == null
                ) { // No results.
                var err = new Error('mentors not found');
                err.status = 404;
                return next(err);
            }
            res.send({jee_mentors: results.jee_mentors, neet_mentors: results.neet_mentors });
                });
    
    };


    export function allMentors(req, res){
        User.find({role:'Mentor'}).select("firstName lastName category history").then(result=>{
            if(result){
                return res.send(result)
            }
        }).catch(error=>{
            return res.send(error)
        })
    }

    export function getMentorByCategory(req, res){
        const category = (req.params.category).toUpperCase();
        console.log(category)
        User.find({category: category})
        .select("firstName lastName category history").then(result=>{
            return res.send(result);
        }).catch(error => {
            return res.send(error);
        })
    }


//dummy function to update fields ,not used in end points
export function user_detail(req, res, next){
    User.findById(req.params.id,  (err, result)=>{
        if (err) { return next(err); }
        if (result == null) { // No results.
            var err = new Error('user not found');
            err.status = 404;
            return next(err);
        }
        res.send(result);
    })
}

export function mentors_update(req, res,next)  {
            Mentor.updateMany({expertise:[]},{$set:{category:"NEET"}},(err, results)=>{
                if(err) { return next(err)}
                else res.send("all done"); 
            })
} 

//here fetching details,mentor blogs(recent 3),and total followers
// export function mentor_detail  (req, res, next) {
// //todo-number of followers and follow button working
//     async.parallel({
//         detail: function (callback) {
//             Mentor.findOne({user:req.params.id},)
//                 .exec(callback)
//         },
//         myblogs: function (callback) {
//             Blog.find({author: req.params.id},'title body_text body_image created_at tag').sort({Date: 1}).limit(3)//convert into most popular
//             .exec(callback)
//         },
//         myfollowers: function (callback) {
//             Follow.find({followed_mentor: req.params.id}).countDocuments()//convert into most popular
//             .exec(callback)
//         },
                              
//     }, function (err, results) {
//         if (err) { return next(err); } // Error in API usage.

//         // CURRENTLY COMMENTED WITH ABHISHEK.... AS ERROR IN LOGIC
//         // if (results.detail == null ||results.myblogs == null ||results.myfollowers == null
//         //     ) { // No results.
//         //     var err = new Error('mentor not found');
//         //     err.status = 404;
//         //     return next(err);
//         // }
//         res.send({
//             detail: results.detail,
//             myblogs: results.myblogs,
//             myfollowers:results.myfollowers
//         });
//     });

// };


// export function mentor_detail=(req,res,next)=> {
    
//     Mentor.findById(req.params.id,(err,result)=>{
//         if(err)return next(err);
//         if(result==null)res.send("no results found");
//         else res.send(result);
//         //res.render("mentor_detail",{mentor_detail:result})
//     })
    
//     }
export function get_mentor_create (req, res,next){
    res.send('mentorform');
    //res.render('path');
}

export function post_mentor_create(req, res)   
     {
 upload(req, res, function (err) {
        // Extract the validation errors from a request.
        // Create Mentor object with escaped and trimmed data (and the old id!)
        var history = 
            {
                profile_picture:"",
                branch:req.body.branch,
                language: req.body.language,               
                college:req.body.college,
                college_type: req.body.college_type,
                year: req.body.year,
                category: req.body.category,
                rank:req.body.rank,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                fb_link: req.body.fb_link,
                linkedin_link: req.body.linkedin_link,
                expertise: req.body.expertise,
                //college_id: req.body.college_id,  
                about_me:req.body.about_me,   
                //college_id: req.file.college_id,
                //add additional req
            }
        if (err instanceof multer.MulterError) {
            console.log("Checking error from isntance of multer")
            console.log(err);
            return res.status(500).json(err)
        } else if (err) {
            console.log("Checking error")
            console.log(err);
            return res.status(500).json(err)
        }else{
            if(req.file){
                console.log("file saved")
                history.profile_picture = `http://${req.hostname}:5005/`+req.file.filename;
                User.findByIdAndUpdate(req.params.id,  {history:history}, function (err, result){
                    if (err) { res.send(err); }
                    if (result == null) { // No results.
                        var err = new Error('Mentor not found');
                        err.status = 404;
                        return next(err);
                    }
                    
                        //console.log(req.user);
                        res.send(result);
                        console.log(result)
                    //res.redirect(theBlog.url)
               })
            }else{
                console.log("no file")
                User.findByIdAndUpdate(req.params.id,  {history:history}, function (err, result){
                    if (err) {res.send(result); }
                    if (result == null) { // No results.
                        var err = new Error('Mentor not found');
                        err.status = 404;
                        return next(err);
                    }
                    
                    res.send(result);
                    console.log(history)
               })
            }
        }
        
            
        })
    }

export function get_mentor_update (req, res,next){
    Mentor.findById(req.params.id, function (err, result) {
        if (err) { return next(err); }
        if (result == null) { // No results.
            var err = new Error('Mentor not found');
            err.status = 404;
            return next(err);
        }
        res.send(result);
        //res.render('appointment', { title: 'Update appointment', appointment: appointment });

    });
}

export function post_mentor_update
    
    
    (req, res, next) {

       var mentor = new Mentor(
            {user:req.body.user,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                phone: req.body.mobile,
                branch: req.body.branch,
                language: req.body.language,
                email: req.body.email,
              // profile_picture="",
                college:req.body.college,
                college_type: req.body.college_type,
                year: req.body.year,
                category: req.body.category,
                rank:req.body.rank,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                fb_link: req.body.fb_link,
                linkedin_link: req.body.linkedin_link,
                expertise: req.body.expertise,
                //college_id: req.body.college_id,  
                about_me:req.body.about_me,             
                _id: req.params.id
            }
        );

        
            Mentor.findByIdAndUpdate(req.params.id, mentor, {}, function (err, result) {
                if (err) { return next(err); }
                if (result == null) { // No results.
                    var err = new Error('Mentor not found');
                    err.status = 404;
                    return next(err);
                }
                // Successful - redirect to genre detail page.
                //res.redirect(theMentor.url);
                res.send(result);
            });
        
    }


export function get_mentor_delete (req, res,next){
    Mentor.findById(req.params.id,(err,result)=>{
        if(err)return next(err);
        if (result == null) { // No results.
            var err = new Error('Mentor not found');
            err.status = 404;
            return next(err);
        }
        res.render('profile_delete',{result:result});
    })
    
}

export function post_mentor_delete (req, res,next){
    Mentor.findByIdAndRemove(req.params.id, (err,result)=>{ 
        if (err) { return next(err); }
        if (result == null) { // No results.
            var err = new Error('Mentor not found');
            err.status = 404;
            return next(err);
        }
        res.send("success");
      // res.redirect('/catalog/Mentors')
    })
}
//follow mentor
export function post_follow_mentor(req,res,next) { //validation need?also make endpoint to /mentors/:id/followMentor
    var follow=new Follow({ 
        // user=req.user.id,
        // followed_mentor=req.params.id //url- mentors/:id
    }
 
    )
    follow.save((err,result)=>{
        if(err)return next(err);
        else res.send(result)
    })
     }

//mentor review     
export function post_mentor_review
          (req, res, next)  {
       var mentor_review = new Mentor_review(
                { 
                mentor:req.params.mentorId,
                   mentee:req.params.menteeId,
                   feedback: req.body.feedback,
                   stars:req.body.stars,
                }
            );
    
           
                mentor_review.save((err,result)=>{
                    if (err) { return next(err); }
                    else res.send("Success")
                    //res.redirect(theMentee.url);
                })
                    
              
            
}
    
    
    
    