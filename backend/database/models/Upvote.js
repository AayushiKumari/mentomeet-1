import mongoose from '../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model // For date handling.
var upvoteSchema = new Schema({
  upvoter: { type: Schema.Types.ObjectId , ref:'User',required: true},
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'modelName'
  },
  modelName: {
    type: String,
    required: true,
    enum: ['Blog', 'Quora.question','Quora.answer','Comment']
 
  }
});

export default model('Upvote' ,upvoteSchema)

