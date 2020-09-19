import Blog from '../../database/models/Blog.js'
import Mentor from '../../database/models/Mentor.js'
import Upvote from '../../database/models/Upvote.js'
import Comment from '../../database/models/Comment.js'
import multer from "multer"
import async from 'async'

function likesComparator(a, b){
    var comp = 0;
    if(a.likes.length > b.likes.length){
        comp =  -1;
    }else {
        comp = 1
    }

    return comp
}

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





//query for all blogs based on category,tags and author ,also for easyness only 1 query we are adding
//if no query than blog_list view with all type blogs
//eg- /blogs?tag=jee
export function isquerypresent (req, res, next) {
    if(!req.query.category && !req.query.tag && !req.query.author) return next();

    else if(req.query.category) {
        async.parallel({
        related_blogs: function (callback) {
            Blog.find({verification_status:false,category:req.query.category},'author title body_image tag created_at minute_read  url ').sort({Date:1})
                .exec(callback)
        },//add another query if need                                
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.related_blogs == null 
            ) { // No results.
            var err = new Error('Blogs not found');
            err.status = 404;
            return next(err);
        }
        res.send({related_blogs: results.related_blogs,});
            });}
    else if(req.query.tag) {
        async.parallel({
        related_blogs: function (callback) {
            Blog.find({tag:req.query.tag},'author title body_image tag created_at minute_read  url ').sort({Date:1})
                .exec(callback)
        },//add another query if need                                
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.related_blogs == null 
            ) { // No results.
            var err = new Error('Blogs not found');
            err.status = 404;
            return next(err);
        }
        res.send({related_blogs: results.related_blogs});
            });}
    else if(req.query.author) {
            async.parallel({
            related_blogs: function (callback) {
                    Blog.find({author:req.query.author},'author title body_image tag created_at minute_read  url ').sort({Date:1})
                        .exec(callback)
                },//add another query if need                                
            }, function (err, results) {
            if (err) { return next(err); } // Error in API usage.
            if (results.related_blogs == null 
                    ) { // No results.
                    var err = new Error('Blogs not found');
                    err.status = 404;
                    return next(err);
                }
            res.send({related_blogs: results.related_blogs});
                    });}                
   
}
//give a option of "see more "option to see all blogs category wise using query
//fetching all blogs of all categories (top 3 of every )
//endpoint=/blogs

export function allBlogs(req, res){
    Blog.find().select("author body_image body_text category tag title likes date").sort({date:-1}).then(result=>{
        if(result){
            return res.send(result)
        }
    }).catch(error=>{
        return res.send(error)
    })
}


export function blog_list (req, res,next){
    async.parallel({
        jee_blogs: function (callback) {
            Blog.find({verification_status:false,category:'JEE'},'author title body_image tag created_at minute_read  url ').sort({Date:1})
                .exec(callback)
        },
        neet_blogs: function (callback) {
            Blog.find({verification_status:false,category:'NEET'},'author title body_image tag created_at minute_read  url ').sort({Date:1})
                .exec(callback)
        },
        career_blogs: function (callback) {
            Blog.find({verification_status:false,category:'CAREER'},'author title body_image tag created_at minute_read  url ').sort({Date:1})
                .exec(callback)
        },
        development_blogs: function (callback) {
            Blog.find({verification_status:false,category:'DEVELOPMENT'},'author title body_image tag created_at minute_read  url ').sort({Date:1})
                .exec(callback)
        },
                              
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.jee_blogs == null ||results.neet_blogs == null||
            results.career_blogs==null||results.development_blogs== null
            ) { // No results.
            var err = new Error('Blogs not found');
            err.status = 404;
            return next(err);
        }
        res.send({jee_blogs: results.jee_blogs, neet_blogs: results.neet_blogs,
            career_blogs:results.career_blogs,development_blogs:results.development_blogs });
            });

}
export function blog_list_count (req, res,next){
    async.parallel({
        jee_blogs: function (callback) {
            Blog.countDocuments({category:'JEE'})
                .exec(callback)
        },
        neet_blogs: function (callback) {
            Blog.countDocuments({category:'NEET'})
                .exec(callback)
        },
        career_blogs: function (callback) {
            Blog.countDocuments({category:'CAREER'})
                .exec(callback)
        },
        development_blogs: function (callback) {
            Blog.countDocuments({category:'DEVELOPMENT'})
                .exec(callback)
        },                              
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.jee_blogs == null ||results.neet_blogs == null||
            results.career_blogs==null||results.development_blogs== null
            ) { // No results.
            var err = new Error('Blogs not found');
            err.status = 404;
            return next(err);
        }
        res.send({jee_blogs: results.jee_blogs, neet_blogs: results.neet_blogs,
            career_blogs:results.career_blogs,development_blogs:results.development_blogs });
            });

}
//not working
// export function findCategory(model,id){
// model.findById(id,'category',(err,result)=>{
// if (err)return ;
// else return result;
// })
// }

//blog details ,upvotes,comments,rltd category blogs(not working) and rltd author blogs(not working) 
//endpt=blogs/:id
export function blog_detail(req,res,next) {
    
    async.parallel({//other blogs from same or other related blog list
        detail: function (callback) {
            Blog.findById(req.params.id)
                .exec(callback)
        },
        upvotes: function (callback) {
            Upvote.find({modelId: req.params.id,modelName:'Blog'}).countDocuments()
            .exec(callback)
        },
        comments: function (callback) {
            Comment.find({modelId: req.params.id,modelName:'Blog'})   
            .exec(callback)
        },
        related_category_blogs: function (callback) {//this is not working 
            Blog.find({category: (Blog.findById(req.params.id)).category,verification_status:false})   
            .exec(callback)
        },
        author_other_blogs: function (callback) {//thiis is not working the same way
            Blog.find({author: (Blog.findById(req.params.id)).author,verification_status:false})   
            .exec(callback)
        },
                              
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.detail == null ||results.upvotes == null ||
            results.comments == null || results.related_category_blogs==null
            ||results.author_other_blogs==null
            ) { // No results.
            var err = new Error(' not found');
            err.status = 404;
            return next(err);
        }
        res.send({detail: results.detail, upvotes: results.upvotes,
            comments: results.comments ,related_category_blogs:results.related_category_blogs,
            author_other_blogs:results.author_other_blogs});
            });
}


export function get_blog_create(req, res,next){
    res.send('Blogform');
    //res.render('path');
}

export function post_blog_create 
    // Process request after validation and sanitization.
    (req, res)  {
        // Extract the validation errors from a request.
        var blogSchema = {//handle author using req.user._id
              // author_name:req.user.first_name+" "+req.user.last_name,
              author: req.body.author,
                title: req.body.title,
                body_text: req.body.body_text,
                body_image: "",
                category: req.body.category,
                minute_read: req.body.minute_read,
                tag:req.body.tag,
            };
        
            if(req.file){
                console.log("file saved")
                blogSchema.body_image = `http://${req.hostname}:5005/`+req.file.filename;
                // Object.assign(qSchema, {images: "http://localhost:5005/questionImg/"+req.file.filename});
                Blog.create(blogSchema).then(result => {
                    return res.send(result)
                }).catch(error => {
                    return res.send(error)
                })
            }else{
                console.log("no file")
                Blog.create(blogSchema).then(result => {
                    return res.send(result)
                }).catch(error => {
                    return res.send(error)
                })
            }
        
        
            // Data from form is valid. Update the record.
            
        
           
        
}


export function get_blog_update (req, res,next){
    Blog.findById(req.params.id, function (err, result) {
        if (err) { return next(err); }
        if (result == null) { // No results.
            var err = new Error('Blog not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.send(result);
        //res.render('appointment', { title: 'Update appointment', appointment: appointment });

    });
}

export function post_blog_update 

    // Process request after validation and sanitization.
    (req, res, next)  {
    // Create Blog object with escaped and trimmed data (and the old id!)
        var blog = new Blog(
            {
                title: req.body.title,
                body_text: req.body.body_text,
                body_image:req.file,
                category: req.body.category,
                minute_read: req.body.minute_read,
                tag:req.body.tag,
                _id: req.params.id
            }
        );

      
            Blog.findByIdAndUpdate(req.params.id, blog, {}, function (err, result) {
                if (err) { return next(err); }
                if (result == null) { // No results.
                    var err = new Error('Blog not found');
                    err.status = 404;
                    return next(err);
                }
                // Successful - redirect to genre detail page.
                //res.redirect(theBlog.url);
                res.send(blog);
            });
        }
    
export function get_blog_delete (req, res,next){
    Blog.findById(req.params.id,(err,result)=>{
        if(err)return next(err);
        if (result == null) { // No results.
            var err = new Error('Blog not found');
            err.status = 404;
            return next(err);
        }
        res.send(result);
    })
    
}

export function post_blog_delete (req, res,next){
    Blog.findByIdAndRemove(req.params.id, (err,result)=>{ 
        if (err) { return next(err); }
        if (result == null) { // No results.
            var err = new Error('Blog not found');
            err.status = 404;
            return next(err);
        }
        res.send("success");
      // res.redirect('/catalog/Blogs')
    })
}
//comments for blogs 
export function post_comment_onBlog
 (req, res, next)  {
   var comment = new Comment(
            {
               body: req.body.body,
               modelId:req.params.id,
               modelName:'Blog'
            }
        );
        comment.save((err,result)=>{
                if (err) { return next(err); }
                else res.send(result)
                //res.redirect(theMentee.url);
            })
                
          
}
//upvote on blogs endpoint=blogs/:id
export function post_upvote_blog(req,res,next){ //validation need?also make endpoint to /mentors/:id/followMentor
    var upvote=new Upvote({ 
      //  user=req.user.id,
       // modelId=req.params.id,
       // modelName='Blog' //url- mentors/:id
    }
 
    )
    upvote.save((err,result)=>{
        if(err)return next(err);
        else res.send(result)
    })
}
 
//upvote on comments endpoint=blogs/:blogId/:commentId
export function post_upvote_comment(req,res,next){ //validation need?also make endpoint to /mentors/:id/followMentor
    var upvote=new Upvote({ 
        // user=req.user.id,
        // modelId=req.params.commentId, //provide id using this.id of comment
        // modelName='Comment' //url- mentors/:id
    }
 
    )
    upvote.save((err,result)=>{
        if(err)return next(err);
        else res.send(result)
    });
}






//===================================================================

export function blogLikes(req, res){
    let uid = req.body.uid
    let bid = req.body.bid
    console.log(bid)
    console.log(uid)
    Blog.findOne({_id:bid, likes: uid}).then(blog => {
        console.log(blog)
        if(!blog){  //i.e. if null
            console.log(blog)
            console.log("not in liked");
            Blog.findByIdAndUpdate(
                {_id:bid}, 
                {$addToSet: {likes:uid}},
                {new: true,useFindAndModify: false}).then(result=>{
                console.log(result.likes)
                return res.send("upvote");
            }).catch(error=>{
                return res.send(error);
            })            
        }
       
    }).catch(error => {
        console.log("errrrrr")
        console.log(error)
        return res.send(error)
    })
}

export function blogLikessss(req, res){
    let uid = req.body.uid
    let bid = req.body.bid
    console.log(bid)
    Blog.findById(bid).then(blog => {
        console.log("abc")
        if(blog!=null){
            console.log("xyz")
            console.log(blog.likes)
            if(!(blog.likes).includes(uid)){
                blog.likes.push(uid);
            }else{
                return res.send("already liked")
            }            
            quest.save().then(result => {
                return res.send("upvote")
            }).catch(error => {
                return res.send(error)
            })
        }else{
            return res.send("blog not found")
        }
            
    }).catch(error => {
        return res.send(error)
    })
}

//views---------

export function blogViews(req, res){
    let bid = req.body.bid;
    Blog.findByIdAndUpdate(
        {_id: bid}, 
        {$inc : {'views' : 1}},
        {new: true,useFindAndModify: false}).then(result => {
            if(result!=null){
                return res.send("view increased")
            }
            return res.send("no result")
    }).catch(error => {
        return res.send(error)
    })
}


// comments------------------------------------

export function LikedBlog(req, res){
    Blog.find({},{"likes": 1}).select("title likes").then(blogs=>{        
        var r = blogs.sort(likesComparator);        
        return res.send(r.slice(0,5))
    }).catch(error => {
        return res.send(error)
    })
}

export function getBlogById(req, res){
    const bid = req.params.bid;
    console.log(bid)
    Blog.findById(bid)
    .select("author body_image body_text category tag title likes comments date views").then(result=>{
        return res.send(result);
    }).catch(error => {
        return res.send(error);
    })
}

export function getBlogByCategory(req, res){
    const category = (req.params.category).toUpperCase();
    console.log(category)
    Blog.find({category: category})
    .select("author body_image body_text category tag title likes comments date views").sort({date:-1}).then(result=>{
        return res.send(result);
    }).catch(error => {
        return res.send(error);
    })
}
export function getBlogByTag(req, res){
    const tag = (req.params.tag).toUpperCase();
    console.log(tag)
    Blog.find({tag: tag})
    .select("author body_image body_text category tag title likes comments date views").sort({date:-1}).then(result=>{
        return res.send(result);
    }).catch(error => {
        return res.send(error);
    })
}

export function commentOnBlog(req, res){
    let bid = req.params.bid;
    const commentSchema = {
        author : req.body.author,
        comment: req.body.comment
    }
    Blog.findById(bid).then(blog => {
        console.log(blog)
        if(blog!=null){
            console.log("xyz")
            console.log(blog.comments)
            blog.comments.push(commentSchema);
          
            blog.save().then(result => {
                return res.send(result)
            }).catch(error => {
                return res.send(error)
            })
        }else{
            return res.send("blog not found")
        }
    }).catch(error => {
        return res.send(error)
    })
}
