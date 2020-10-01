import mongoose from '../../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model

const Announcement = new Schema({
    eventName:{
        type:String,
        required:true
    },
    mode:{
        type:String,
        required:true
    },
    contact:{
        type: String,
        required: true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    link:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String
    }
},({timestamps:true}))

// export default model('Announcement', Announcement)
export default model('Announcement', Announcement)