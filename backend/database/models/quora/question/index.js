// var mongoose = require('mongoose');
import mongoose from '../../../connect.js'

var Schema = mongoose.Schema;

const answerSchema = new Schema({   
  author:{
    type: Schema.Types.ObjectId, 
    ref: 'Admin2',
    required: true
  },//only author can edit this object //ref:User...
  question:{
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },       
  bodyContent: {
    type: String,
    required: true,
    maxlength: 100 
  },
  images:{
    type: String,
    default: "no image"
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Admin2'
  }], //upvote fxn
  date: { type: Date, default: Date.now}  
});




var questionSchema = new Schema({   
  author:{
    type: Schema.Types.ObjectId,
    ref: 'Admin2',
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
    enum: ['CAREER','JEE','NEET','DEVELOPMENT']
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Admin2'
  }],
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