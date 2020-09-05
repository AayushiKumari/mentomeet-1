import mongoose from '../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model // For date handling.

var mentor_reviewSchema = new Schema({
  mentee: { type: Schema.Types.ObjectId , ref:'Mentee',required: true},
  mentor: { type: Schema.Types.ObjectId , ref: 'Mentor',required: true},
  date: { type: Date ,default: Date.now},//obj.date=new Date 
  feedback:{type:String,maxlength: 200,required: true},
  stars:{type:Number,max: 5,min:1,required: true}
});


// Virtual for this mentor instance URL.
mentor_reviewSchema.virtual('url').get(function() {
  return '/mentor/' + this._id;
});

export default model('Mentor_review' ,mentor_reviewSchema)

// Export model.
