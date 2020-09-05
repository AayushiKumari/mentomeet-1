import mongoose from '../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model // For date handling.

var commentSchema = new Schema({
  author: { type: Schema.Types.ObjectId , ref:'User',},//* make required: true
  body: { type: String , required: true,maxlength: 600},//*
  date: { type: Date ,default: Date.now},//obj.date=new Date 
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'modelName',
  },
  modelName: {
    type: String,
    required: true,
    enum: ['Blog', 'Quora.question','Quora.answer']
 
  }
});

export default model('Comment', commentSchema);