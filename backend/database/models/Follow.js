import mongoose from '../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model // For date handling.

var followingSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User',required: true},//*
    followed_mentor:{type: Schema.Types.ObjectId, ref: 'Mentor',required: true}//*
    //fxn for my followers and following ,total count
    //TOD
});


// Virtual for this mentor instance URL.

export default model('Follow' ,followingSchema)
