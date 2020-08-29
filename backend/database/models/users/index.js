import mongoose from '../../connect.js'
import addVirtual from './virtuals/virtuals.js'

const Schema = mongoose.Schema
const model = mongoose.model


const User = new Schema({
    
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: 32
    },
    hashedPassword:{
        type:String,
        required:true
    },
    salt:String,
    history:{
        type:Array,
        default:[]
    }
} ,{timestamps:true})


addVirtual(User,'password')

export default model('User',User)