import Question from '../../../database/models/quora/question/index.js';
import Answer from '../../../database/models/quora/answer/index.js';
import mongoose from '../../../database/connect.js'
import multer from "multer";


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
     fileSize: 1024 * 1024 * 10   // 10 MB
    }
})
var upload = multer({
    storage: storage
}).single('file')



export function newQuestion(req, res){
    
    upload(req, res, function (err) {
        var qSchema = {
            author: req.body.author,
            question: req.body.question,
            images: "",
            tags: (req.body.tags).split(","),
            category: req.body.category,
        }
        console.log(req.body.tags);

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
                qSchema.images = `http://${req.hostname}:5005/`+req.file.filename;
                // Object.assign(qSchema, {images: "http://localhost:5005/questionImg/"+req.file.filename});
                Question.create(qSchema).then(result => {
                    return res.send(result)
                }).catch(error => {
                    return res.send(error)
                })
            }else{
                console.log("no file")
                Question.create(qSchema).then(result => {
                    console.log(result)
                    return res.send(result)
                }).catch(error => {
                    console.log(error)
                    return res.send(error)
                })
            }
        }
    });
}

export function editQuestion(req, res){
    const qid = req.params.qid;
    const uid = req.params.uid;
   
    upload(req, res, function (err) {

        var qSchema = {
            title: req.body.title,
            bodyContent: req.body.bodyContent,
            images: "",
            tag: req.body.tag,
            category: req.body.category,
            flag: true
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
                qSchema.images = `http://${req.hostname}:5005/`+req.file.filename;
                // Object.assign(qSchema, {images: "http://localhost:5005/questionImg/"+req.file.filename});

                Question.findOneAndUpdate(
                    {_id: qid, author: uid}, 
                    qSchema,
                    {new:true, useFindAndModify: false}
                    ).then(quest => {
                        return res.send(quest)
                    }).catch(error => {
                        return res.send(error)
                    })

                // Question.create(qSchema).then(result => {
                //     return res.send(result)
                // }).catch(error => {
                //     return res.send(error)
                // })
            }else{
                console.log("no file")
                Question.findOneAndUpdate(
                    {_id: qid, author: uid}, 
                    qSchema,
                    {new:true, useFindAndModify: false}
                    ).then(quest => {
                        return res.send(quest)
                    }).catch(error => {
                        return res.send(error)
                    })

                // Question.create(qSchema).then(result => {
                //     return res.send(result)
                // }).catch(error => {
                //     return res.send(error)
                // })
            }
        }
    });
}

export function questionCount(req, res){
    Question.countDocuments({}).then(count => {
        return res.json(count)
    }).catch(error => {
        return res.json(error)
    })
}

export function answerCount(req, res){
    console.log(req.params.qid)
    Question.findById(req.params.qid).then(quest => {        
        return res.json(quest.answers.length)
    }).catch(error => {
        return res.json(error)
    })    
}

export function getAllQuestions(req, res){
    Question.find().select("author question images category tags date flag likes views").sort("-date").then(result => {
        return res.send(result)
    }).catch(error => {
        return res.send(error)
    })
}

export function getAllUnansQuestions(req, res){
    Question.find({answers:[]}).select("author question images category tags date flag likes answers views").sort("-likes").then(result => {
        return res.send(result)
    }).catch(error => {
        return res.send(error)
    })
}

export function unAnsweredCount(req, res){
    Question.countDocuments({answers:[]}).then(count => {        
        return res.json(count)
    }).catch(error => {
        return res.json(error)
    })    
}

export function getAllQuestByMaxLike(req, res){
    console.log("abc")
    Question.find()
    .select("author question images category tags date flag likes views")
    .sort("likes").then(quests=>{
        var r = quests;
        r.sort(likesComparator);        
        return res.send(r)
    }).catch(error => {
        return res.send(error)
    })
}

export function relatedQuestion(req, res){
    let category = (req.params.category).toUpperCase();
    Question.find({"category": category}).select("question likes category").then(quests=>{
        
        var r = quests.sort(likesComparator);        
        return res.send(r.slice(0,5))
    }).catch(error => {
        return res.send(error)
    })
}
export function hotQuestion(req, res){
    Question.find({},{"likes": 1}).select("question likes").then(quests=>{        
        var r = quests.sort(likesComparator);        
        return res.send(r.slice(0,5))
    }).catch(error => {
        return res.send(error)
    })
}

export function getAnsByQId(req, res){
    const qid = req.params.qid;
    console.log(qid)
    Question.findById(qid)
    .select("author question images category tags date flag answers likes views").then(result=>{
        return res.send(result);
    }).catch(error => {
        return res.send(error);
    })
}

export function getQuestByCategory(req, res){
    const category = (req.params.category).toUpperCase();
    console.log(category)
    Question.find({category: category})
    .select("author question images category tags date flag answers likes views").then(result=>{
        return res.send(result);
    }).catch(error => {
        return res.send(error);
    })
}



export function answerToQuest(req, res){
    let qid = req.params.qid;
   
    upload(req, res, function (err) {

        var aSchema = {
            author: req.body.author,
            answer: req.body.answer,
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
                Object.assign(aSchema, {images: `http://${req.hostname}:5005/`+req.file.filename});

                Question.findByIdAndUpdate(
                    {_id:qid},
                    {$push: {answers:aSchema}},
                    {new: true, useFindAndModify: false}).then(result=>{
                    return res.send(result);
                }).catch(error => {
                    return res.send(error);
                })

                // Answer.findByIdAndUpdate(
                //     {_id:aid}, 
                //     {$pull: {likes:uid}},
                //     {new: true,useFindAndModify: false}).then(result=>{
                //     return res.send(result);
                // }).catch(error=>{
                //     return res.send(error);
                // })

                // Answer.create(aSchema).then(result => {
                //     return res.send(result)
                // }).catch(error => {
                //     return res.send(error)
                // })
            }else{
                console.log("no file")
                Question.findByIdAndUpdate(
                    {_id:qid},
                    {$push: {answers:aSchema}},
                    {new: true, useFindAndModify: false}).then(result=>{
                    return res.send(result);
                }).catch(error => {
                    return res.send(error);
                })
                // Answer.create(aSchema).then(result => {
                //     return res.send(result)
                // }).catch(error => {
                //     return res.send(error)
                // })
            }

        }

               
        
    });
    
}

export function editAnswer(req, res){
    const aid = req.params.aid;
    const uid = req.params.uid;
   
    upload(req, res, function (err) {

        var aSchema = {
            bodyContent: req.body.bodyContent,
            images: "no image"
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
                aSchema.images = `http://${window.location.hostname}:5005/`+req.file.filename;
                Answer.findOneAndUpdate(
                    {_id: aid, author: uid}, 
                    aSchema,
                    {new:true, useFindAndModify: false}
                    ).then(ans => {
                        return res.send(ans)
                    }).catch(error => {
                        return res.send(error)
                    })
                // Object.assign(aSchema, {images: "http://localhost:5005/answerImg/"+req.file.filename});
                // Answer.create(aSchema).then(result => {
                //     return res.send(result)
                // }).catch(error => {
                //     return res.send(error)
                // })
            }else{
                console.log("no file")
                Answer.findOneAndUpdate(
                    {_id: aid, author: uid}, 
                    aSchema,
                    {new:true, useFindAndModify: false}
                    ).then(ans => {
                        return res.send(ans)
                    }).catch(error => {
                        return res.send(error)
                    })

                // Answer.create(aSchema).then(result => {
                //     return res.send(result)
                // }).catch(error => {
                //     return res.send(error)
                // })
            }

        }

               
        
    });
    
}

export function questLike(req, res){
    let uid = req.body.uid
    let qid = req.body.qid
    Question.findOne({_id:qid, likes: uid}).then(ans => {
        console.log(ans)
        if(!ans){  //i.e. if null
            console.log(ans)
            console.log("not in liked");
            Question.findByIdAndUpdate(
                {_id:qid}, 
                {$addToSet: {likes:uid}},
                {new: true,useFindAndModify: false}).then(result=>{
                console.log(result.likes)
                return res.send("upvote");
            }).catch(error=>{
                return res.send(error);
            })            
        }
        // else{
        //     console.log("already exists")
        //     Question.findByIdAndUpdate(
        //         {_id:qid}, 
        //         {$pull: {likes:uid}},
        //         {new: true,useFindAndModify: false}).then(result=>{
        //             console.log(result.likes)
        //             return res.send("downvote");
        //     }).catch(error=>{
        //         return res.send(error);
        //     })
        // }
    }).catch(error => {
        return res.send(error)
    })
}

export function ansLikes(req, res){
    let uid = req.body.uid
    let aid = req.body.aid
    let qid = req.body.qid
    console.log(aid)
    Question.findById(qid).then(quest => {
        console.log("abc")
        if(quest!=null && quest.answers.id(aid)!=null){
            console.log("xyz")
            console.log(quest.answers.id(aid).likes)
            if(!(quest.answers.id(aid).likes).includes(uid)){
                quest.answers.id(aid).likes.push(uid);
            }else{
                return res.send("already liked")
            }            
            quest.save().then(result => {
                return res.send("upvote")
            }).catch(error => {
                return res.send(error)
            })
        }else{
            return res.send("quest or ans not found")
        }
            
        // else{
        //     console.log("already exists")
        //     Answer.findByIdAndUpdate(
        //         {_id:aid}, 
        //         {$pull: {likes:uid}},
        //         {new: true,useFindAndModify: false}).then(result=>{
        //         return res.send(result);
        //     }).catch(error=>{
        //         return res.send(error);
        //     })
        // }
    }).catch(error => {
        return res.send(error)
    })
}

//views---------

export function questionViews(req, res){
    let qid = req.body.qid;
    Question.findByIdAndUpdate(
        {_id: qid}, 
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

export function commentOnAns(req, res){
    let qid = req.params.qid;
    let aid = req.params.aid;
    let uid = req.params.uid;
    const commentSchema = {
        author : req.body.author,
        comment: req.body.comment
    }
    Question.findById(qid).then(quest => {
        console.log(quest)
        if(quest!=null && quest.answers.id(aid)!=null){
            console.log("xyz")
            console.log(quest.answers.id(aid).comments)
            quest.answers.id(aid).comments.push(commentSchema);
          
            quest.save().then(result => {
                return res.send(result)
            }).catch(error => {
                return res.send(error)
            })
        }else{
            return res.send("quest or ans not found")
        }
    }).catch(error => {
        return res.send(error)
    })
}

// related----------------------------------------






