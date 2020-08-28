import Question from '../../../database/models/quora/question/index.js';
import Answer from '../../../database/models/quora/answer/index.js';
// var Question = require('../../controllers/Quora/quora.model')
import multer from "multer";

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+'-'+file.originalname)
    }
})
var upload = multer({
    storage: storage
}).single('file')



export function newQuestion(req, res){
   
    upload(req, res, function (err) {

        var qSchema = {
            author: req.params.uid,
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
                qSchema.images = "http://localhost:5005/"+req.file.filename;
                // Object.assign(qSchema, {images: "http://localhost:5005/questionImg/"+req.file.filename});
                Question.create(qSchema).then(result => {
                    return res.send(result)
                }).catch(error => {
                    return res.send(error)
                })
            }else{
                console.log("no file")
                Question.create(qSchema).then(result => {
                    return res.send(result)
                }).catch(error => {
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
                qSchema.images = "http://localhost:5005/"+req.file.filename;
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

export function getAllQuestions(req, res){
    Question.find().select("author question images category tags date flag").sort("-date").then(result => {
        return res.send(result)
    }).catch(error => {
        return res.send(error)
    })
}

export function getAllQuestByMaxLike(req, res){
    console.log("abc")
    Question.find()
    .select("author question images category tags date flag")
    .sort("-likes").then(quests=>{
        return res.send(quests)
    }).catch(error => {
        return res.send(error)
    })
}

export function getAnsByQId(req, res){
    const qid = req.params.qid;
    console.log(qid)
    Answer.find({"question": qid}).populate("question").then(result=>{
        return res.send(result);
    }).catch(error => {
        return res.send(error);
    })
}

export function questLike(req, res){
    let uid = req.params.uid
    let qid = req.params.qid
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
            
        }else{
            console.log("already exists")
            Question.findByIdAndUpdate(
                {_id:qid}, 
                {$pull: {likes:uid}},
                {new: true,useFindAndModify: false}).then(result=>{
                    console.log(result.likes)
                    return res.send("downvote");
            }).catch(error=>{
                return res.send(error);
            })
        }
    }).catch(error => {
        return res.send(error)
    })
}




export function answerToQuest(req, res){
   
    upload(req, res, function (err) {

        var aSchema = {
            author: req.params.uid,
            question: req.params.qid,
            bodyContent: req.body.bodyContent,
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
                Object.assign(aSchema, {images: "http://localhost:5005/"+req.file.filename});
                Answer.create(aSchema).then(result => {
                    return res.send(result)
                }).catch(error => {
                    return res.send(error)
                })
            }else{
                console.log("no file")
                Answer.create(aSchema).then(result => {
                    return res.send(result)
                }).catch(error => {
                    return res.send(error)
                })
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
                aSchema.images = "http://localhost:5005/"+req.file.filename;
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

export function ansLikes(req, res){
    let uid = req.params.uid
    let aid = req.params.aid
    Answer.findOne({_id:aid, likes: uid}).then(ans => {
        console.log(ans)
        if(!ans){  //i.e. if null
            console.log(ans)
            console.log("not in liked");
            Answer.findByIdAndUpdate(
                {_id:aid}, 
                {$addToSet: {likes:uid}},
                {new: true,useFindAndModify: false}).then(result=>{
                return res.send(result);
            }).catch(error=>{
                return res.send(error);
            })
            
        }else{
            console.log("already exists")
            Answer.findByIdAndUpdate(
                {_id:aid}, 
                {$pull: {likes:uid}},
                {new: true,useFindAndModify: false}).then(result=>{
                return res.send(result);
            }).catch(error=>{
                return res.send(error);
            })
        }
    }).catch(error => {
        return res.send(error)
    })
}




