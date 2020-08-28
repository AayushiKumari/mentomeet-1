// import Event from '../../../database/models/events/index.js'
import Booking from './../../../database/models/bookings/index.js'
import mongoose from 'mongoose'
import bookings from './../../../database/models/bookings/index.js'

export function submitEvent(req, res, next){

    // console.log("req.body is")
    // console.log(req.body)
    
    let contentBody = {
        userId:req.body.userId,
        eventName:req.body.eventName,
        venue:req.body.venue,
        contact:req.body.contact,
        approver1:req.body.approver1,
        approver2:req.body.approver2,
        email:req.body.email,
        slots:req.body.slots,
        date:req.body.date,
        month:req.body.month,
        year:req.body.year,
        description:req.body.description,
        user:req.body.user,
        approval1:false,
        approval2:false,
        status:'Pending'
    }

    let newEvent = new Booking(contentBody)
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
}

export function getEventforUser(req,res, next){
    // console.log(req.query.month)
    // let id = parseInt(req.params.bookingId);
    // console.log(typeof(id))
    Booking.findOne({_id:req.params.bookingId},(err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

        res.json(result)
    })
}

export function fetchEventforUser(req,res, next){
    // console.log(req.query.month)
    Booking.find({userId:req.params.userId},(err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

        res.json(result)
    })
}

export function submitAdmin1Event(req, res, next){

    // console.log("req.body is")
    // console.log(req.body)
    
    let contentBody = {
        userId:req.body.userId,
        eventName:req.body.eventName,
        venue:req.body.venue,
        contact:req.body.contact,
        email:req.body.email,
        approver1:req.body.approver1,
        approver2:req.body.approver2,
        slots:req.body.slots,
        date:req.body.date,
        month:req.body.month,
        year:req.body.year,
        description:req.body.description,
        user:req.body.user,
        approval1:true,
        approval2:false,
        status:'Pending'
    }

    let newEvent = new Booking(contentBody)
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
}

export function fetchApprovals(req, res, next){
    var user = JSON.parse(req.body.user);
    console.log(user.userId)
    Booking.find({approval1:false,status:'Pending', approver1:user.email},(err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

        res.json(result)
    })
}

export function fetchApprovals2(req, res, next){
    var user = JSON.parse(req.body.user);
    console.log(user.userId)
    Booking.find({approval1:true, approval2:false,status:'Pending', approver2:user.email},(err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

        res.json(result)
    })
}


export function setApproval1(req, res, next){
    let id = req.params.id ;
    Booking.updateOne({_id:id},{approval1:true},(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json({message:"updated sucessfully"})
    })
}

export function setDecline1(req, res, next){
    let id = req.params.id ;
    Booking.updateOne({_id:id},{status:req.body.comment},(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json({message:"updated sucessfully"})
    })
}

export function setApproval2(req, res, next){
    let id = req.params.id ;
    Booking.updateOne({_id:id},{approval2:true, status:'Approved'},(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json({message:"updated sucessfully"})
    })
}
export function setDecline2(req, res, next){
    let id = req.params.id ;
    Booking.updateOne({_id:id},{status:req.body.comment},(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json({message:"updated sucessfully"})
    })
}

export function fetchEmptySlots(req,res,next){
    console.log(req.query)
    Booking.find({venue:req.query.venue, date:req.query.date,month:req.query.month, year:req.query.year, status:'Approved'},(err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }
        // console.log(result)

        var arr = new Array(24).fill(0);
        var n = result.length;
        
        for(var i=0;i<24;i++){
            for(var j=0;j<n;j++){
                if(result[j].slots[i]===1){
                    arr[i]={
                        eventName: result[j].eventName,
                        bookedBy: result[j].email
                    }
                }
            }
        }
        console.log(arr)
        res.json(arr)
    })
}


export function fetchBookings(req, res, next){
    Booking.find({date:req.query.date,month:req.query.month, year:req.query.year},(err,result)=>{
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
}

export function fetchLhcBookings(req, res, next){
    Booking.find({venue:req.query.venue, date:req.query.date,month:req.query.month, year:req.query.year},(err,result)=>{
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
}