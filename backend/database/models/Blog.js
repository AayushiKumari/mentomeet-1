import mongoose from '../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model 
//require field has * in comment

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


var blogSchema = new Schema({   
  author:{type: String, required: true}, //* make it require
  title: { type: String, required: true, maxlength: 100 },//*
  body_text: { type: String, required: true, maxlength: 10000000 }, //*
  body_image: { type: String,default:""},//need buffer for image,will add image
  tag:{ type: String, default:'EXAM',enum:['PHYSICS','CHEMESTRY','MATHS','PCM','PCB','BIOLOGY','JEE-EXAM',
  'JEE-ADVANCED','AIIMS','NEET-EXAM','EXAM','JEE-11','JEE-12','JEE-DROPPER','NEET-DROPPER','DEV-BLOG' ]},
  //tag is broader than category and for now to make it easy only one tag we can add most appropriate.
  category: { type: String, default:'JEE', enum: ['CAREER','JEE','NEET']},//ie. category jee,neet,webd,career counseling
  minute_read: { type: Number, min: 0,max: 60,default:5},
  verification_status: { type: Boolean,  default: false,},//upvote will be handled in seprate document,for now ok
  date: { type: Date, default: Date.now},
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Admin2'
  }],
  views: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  flag: {
    type: Boolean,
    default: false
  },
},{
  timestamps: true
});


// Virtual for this mentor instance URL.
blogSchema.virtual('url').get(function() {
  return '/mentors/' + this._id;
});


export default model('Blog' ,blogSchema)