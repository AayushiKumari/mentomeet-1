// var mongoose = require('mongoose');
import mongoose from '../../../connect.js'

var Schema = mongoose.Schema;

const commentSchema = new Schema({
  author:{
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now}
})

const answerSchema = new Schema({   
  author:{
    type: String,
    required: true
  },//only author can edit this object //ref:User...       
  answer: {
    type: String,
    required: true
  },
  images:{
    type: String,
    default: "no image"
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Admin2'
  }], //upvote fxn
  comments: [commentSchema],
  date: { type: Date, default: Date.now}  
});




var questionSchema = new Schema({   
  author:{
    type: String,
    required: true
  },
  question: { 
    type: String, 
    required: true, 
    maxlength: 300 
  },
  images:{
    type: String,
    default: ""
  },
  tags:[{ type: String, maxlength: 100, default: ""}],
  date: { 
    type: Date, 
    default: Date.now
  },   
  category: { 
    type: String, 
    default:'JEE', 
    enum: ['CAREER','JEE','NEET','DEVELOPMENT','OTHER']
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Admin2'
  }],
  views: {
    type: Number,
    default: 0
  },
  flag: {
    type: Boolean,
    default: false
  },
  answers: [answerSchema],
  },{
  timestamps: true
});


// Export model.
export default mongoose.model('Question', questionSchema);