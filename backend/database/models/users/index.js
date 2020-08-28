import mongoose from '../../connect.js'
import addVirtual from './virtuals/virtuals.js'

const Schema = mongoose.Schema
const model = mongoose.model

const roleSchema = new Schema({
    role:{
        type: String
    },
    activeStatus:{
        type:String
    }
})

const personSchema = new Schema({
    shortName:{
        type: String
    },
    fullName:{
        type: String,
        required: true
    },
    roles: [roleSchema],
    displayPicture:{
        type: Buffer
    }
})

const studentSchema = new Schema({
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    enrollmentNumber: {
        type: String
    },
    currentYear:{
        type: Number
    },
    currentSemester: {
        type: Number
    }
})

const facultySchema = new Schema({
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    designation:{
        type: String
    }
})

const contactSchema = new Schema({
    emailAddress: {
        type: String
    },
    instituteWebmailAddress:{
        type: String
    },
    primaryPhoneNumber: {
        type: String
    }
})

const User = new Schema({
    userId:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    person: personSchema,
    student: studentSchema,
    facultyMember: facultySchema,
    contactInformation: contactSchema,
   
    role:{
        type:String,
        required: true
    },
    history:{
        type:Array,
        default:[]
    }
} ,{timestamps:true})


addVirtual(User,'password')

export default model('User',User)