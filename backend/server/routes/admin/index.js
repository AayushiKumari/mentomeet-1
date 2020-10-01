import express from 'express';
import dotenv from 'dotenv'
import User from '../../../database/models/users/index.js'
import Announcement from '../../../database/models/announcements/index.js'

const router = express.Router();

function admin_check(req, res, next) {
    // API_KEY in body parameters in needed
    console.log("Admin check");

    if (req.body.API_KEY) {
        console.log("API Key Provided", req.body.API_KEY);
        console.log("API Key is", '9950874706-7744822894');

        // Change this API key and most probable store it in an environment variable
        if (req.body.API_KEY === '9950874706-7744822894') { //process.env.API_KEY
            return next();
        } else {
            console.log("Incorrect API key")
            var err = new Error('Wrong API Key Provided');
            err.status = 404;
            return next(err);
        }

    } else {
        console.log("NO API Key provided");
        var err = new Error('No API Key Provided');
        err.status = 404;
        return next(err);
    }
}

router.post('/admin/users', admin_check, function (req, res) {
    /**
     * TAKE care of API_KEY check
     * Required Params
     *  skip: The number to skip to, for example if skip(40) then start from 41
     *  limit: The limit the number of user you want to
     * 
     * Default to 1 to 20 if not provided params
     * 
     * Return
     *  The data in json form of each user (See Users schema)
     * 
     * Returns an empty array if no user found 
     */
    console.log("Admin route!");

    let bodySkip = req.body.skip;
    let bodyLimit = req.body.limit;

    if (!bodySkip) {
        bodySkip = 0;
    }

    if (!bodyLimit) {
        bodyLimit = 20;
    }

    // console.log(bodySkip, bodyLimit);
    // MongoDB call
    User.find({}).sort({ role : -1}).skip(bodySkip).limit(bodyLimit).then(result => {
        // console.log(result);
        return res.json(result);
    }).catch(err => {
        return next(err);
    });
});

router.post('/admin/nusers', admin_check, (req, res) => {
    /**
     * Provides the current nummber of users
     * Stored in the Users doc
     * 
     * Params: API_KEY needed to make a request
     * 
     * return: error or { count: number_of_users (int) }
     */
    User.count({}, function(error, result) {
        if (error) {
            var err = new Error('Error');
            err.status = 404;
            return next(err);
        } else {
            return res.json({count: result});
        }
    });
});

// by ABD

router.post('/admin/announcements', admin_check, (req, res) => {

    let newEvent = new Announcement(req.body)
    console.log("newEvent is ")
    console.log(newEvent)
    
    newEvent.save((err, event)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

        res.json(event)   
    })
    
})

router.get('/admin/announcements/fetch', (req, res) => {
    Announcement.find((err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }
        console.log(result)

        res.json(result)
    })
})

export default router;
