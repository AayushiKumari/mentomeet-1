// var mongoose = require('mongoose');
import mongoose from '../../../connect.js'
// var moment = require('./node_modules/moment'); // For date handling.

var Schema = mongoose.Schema;

//answer schema
var answerSchema = new Schema({   
  author:{type: Schema.Types.ObjectId, ref: 'Admin2',required: true},//only author can edit this object //ref:User...
  question:{type: Schema.Types.ObjectId, ref: 'Question',required: true} ,       
  bodyContent: { type: String, required: true, maxlength: 100 },
  images:{
    type: String,
    default: "no image"
  },
  date: { type: Date, default: Date.now},
  likes: [{
      type: Schema.Types.ObjectId,
      ref: 'Admin2'
  }], //upvote fxn
},{
    timestamps: true
  });




// Export model.
export default mongoose.model('Answer', answerSchema);