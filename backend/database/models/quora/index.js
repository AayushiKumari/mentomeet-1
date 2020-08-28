// var mongoose = require('mongoose');
import mongoose from '../../connect.js'
// var moment = require('./node_modules/moment'); // For date handling.

var Schema = mongoose.Schema;
//TODO- upvote 1/user or userupvote seprate model,sort and filter methods
var questionSchema = new Schema({   
  author:{
    type: Schema.Types.ObjectId,
    ref: 'Admin2',
    required: true
  },//only author can edit this object
  title: { 
    type: String, 
    required: true, 
    maxlength: 100 
  },
  bodyContent: { 
    type: String, 
    required: true, 
    maxlength: 100 
  }, //add image as well
  images:{
    type: String,
    default: "no image"
  },
  tag:[{ type: String, maxlength: 100,}],
  date: { 
    type: Date, 
    default: Date.now
  },   
  category: { 
    type: String, 
    default:'JEE', 
    enum: ['CAREER','JEE','NEET','DEVELOPMENT']
  },//ie. category jee,neet,webd,career counseling  
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Admin2'
  }], //upvote fxn 
},{
  timestamps: true
});




//answer schema
var answerSchema = new Schema({   
  author:{type: Schema.Types.ObjectId, ref: 'User',required: true},//only author can edit this object
  question:{type: Schema.Types.ObjectId, ref: 'Question',required: true} ,       
  body: { type: String, required: true, maxlength: 100 }, 
  date: { type: Date, default: Date.now},     
  like: { type: Number,  default: 0,},//upvote fxn
});




// Export model.
export default mongoose.model('Question', questionSchema);
// export default mongoose.model('Answer', answerSchema);