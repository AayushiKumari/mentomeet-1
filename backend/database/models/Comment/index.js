var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;
//todo: add upvote ref.,
var commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId , ref:'User',required: true},
  body: { type: String , required: true,maxlength: 600},
  date: { type: Date ,default: Date.now},//obj.date=new Date 
  on: {
    type: Schema.Types.ObjectId,
    required: true,
    // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
    // will look at the `onModel` property to find the right model.
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['Blog', 'Quora.question','Quora.answer']


    
  }
});

module.exports = mongoose.model('Comment', commentSchema);