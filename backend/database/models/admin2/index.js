// ({token:tok, user :{_id,userId,fullName,contact,email,role}})

import mongoose from '../../connect.js'
import addVirtual from './../users/virtuals/virtuals.js'

const Schema = mongoose.Schema
const model = mongoose.model

const Admin2 = new Schema({
    // userId:{
    //     type: Number,
    //     required: true
    // },
    fullName:{
        type: String,
        required: true
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    hashedPassword:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:String,
        required: true
    },
    history:{
        type:Array,
        default:[]
    }
} ,{timestamps:true})


addVirtual(Admin2,'password')

export default model('Admin2',Admin2)