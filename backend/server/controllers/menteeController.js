import Blog from '../../database/models/Blog.js'
import Mentee from '../../database/models/Mentee.js'
import Upvote from '../../database/models/Upvote.js'
import Comment from '../../database/models/Comment.js'
import User from '../../database/models/users/index.js'

//var async = require('async');

export function mentee_list(req, res,next){
    Mentee.find({},'first_name last_name class coaching subject  url',(err,result)=>{
        if(err) { 
        var err = new Error(' error');
        err.status = 404;
        return next(err);}
        if (result.length==0) res.send("no results found");
         else   {
          res.send(result);
        }       //res.render("Menteelist",{list:result});
        
        })
}

export function mentee_detail(req,res,next) {
    
    Mentee.findById(req.params.id,(err,result)=>{
        if(err)return next(err);
        if (result == null) { // No results.
            var err = new Error(' not found');
            err.status = 404;
            return next(err);
        }
        res.send(result);
        //res.render("Mentee_detail",{Mentee_detail:result})
    })
    
    }
export function get_mentee_create (req, res,next){
    res.send('Menteeform');
    //res.render('path');
}

export function post_mentee_create
   
 (req, res, next) {
   var history = [
            {
                standard: req.body.standard,               
                coaching: req.body.coaching,
                category: req.body.category,
                subject:req.body.subject,
            }
   ]
            // Data from form is valid. Update the record.
            User.findByIdAndUpdate(req.params.id,  {history:history}, function (err, result){
                if (err) {console.log(err); return next(err); }
                if (result == null) { // No results.
                    var err = new Error('Mentee not found');
                    err.status = 404;
                    return next(err);
                }
                res.send(result);
                console.log(result);
                //res.redirect(theMentee.url);
            })
                
          
        
    }




export function get_mentee_update  (req, res,next){
    Mentee.findById(req.params.id, function (err, result) {
        if (err) { return next(err); }
        if (result == null) { // No results.
            var err = new Error('Mentee not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.send("success");
        //res.render('appointment', { title: 'Update appointment', appointment: appointment });

    });
}

export function post_mentee_update
    
    // Process request after validation and sanitization.
    (req, res, next)  {

        // Extract the validation errors from a request.

        // Create Mentee object with escaped and trimmed data (and the old id!)
        var mentee = new Mentee(
            {//user:req.user._id,mentor:req.params.id
                user:req.body.user,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                email:req.body.email,
                standard: req.body.standard,               
                coaching: req.body.coaching,
                category: req.body.category,
                subject:req.body.subject,               
                _id: req.params.id
            }
        );

            Mentee.findByIdAndUpdate(req.params.id, mentee, {}, function (err, result) {
                if (err) { return next(err); }
                if (result == null) { // No results.
                    var err = new Error(' not found');
                    err.status = 404;
                    return next(err);
                }
                //res.redirect(theMentee.url);
                res.send(mentee);
            });
        
    }


export function get_mentee_delete (req, res,next){
    Mentee.findById(req.params.id,(err,result)=>{
        if(err)return next(err);
        if (result == null) { // No results.
            var err = new Error(' not found');
            err.status = 404;
            return next(err);
        }
        res.send(result);
        //res.render('profile_delete',{result:result});
    })
    
}

export function post_mentee_delete (req, res,next){
    Mentee.findByIdAndRemove(req.params.id, (err,result)=>{ 
        if (err) { return next(err); }
        if (result == null) { // No results.
            var err = new Error(' not found');
            err.status = 404;
            return next(err);
        }
        res.send("success");
      // res.redirect('/catalog/Mentees')
    })
}
