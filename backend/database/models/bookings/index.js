import mongoose from '../../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model

const Booking = new Schema({
    userId:{
        type:Number,
        required:true
    },
    eventName:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    contact:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    slots:[{
        type: Number
    }],
    date:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    user:{
        type:String,
        required:true
    },
    approval1:{
        type:Boolean,
        required:true
    },
    approver1:{
        type:String,
        required:true
    },
    approval2:{
        type:Boolean,
        required:true
    },
    approver2:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:true
    }
},({timestamps:true}))

export default model('Booking' ,Booking)