import mongoose from '../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model // For date handling.   
var menteeSchema = new Schema({
user:{type: Schema.Types.ObjectId, ref: 'User',},//* make required: true
mentor:[{type: Schema.Types.ObjectId, ref: 'Mentor',}],//* set required: true} mentee can contact with many mentors
//personal details
first_name: { type: String,  maxlength: 100 ,trim: true},//*set required: true,
last_name: { type: String, maxlength: 100 ,trim:true}, //*required: true, 
phone: { type: Number,},
email: { type: String,maxlength: 100 ,trim:true},
coaching:{type: String, maxlength: 100,required: true},//*
standard: { type: Number,required: true , min: 1,max:12,},//*  
category: { type: String, default:'JEE', enum: ['CAREER','JEE','NEET','DEVELOPMENT']}, //*//equired: true,ie.r category jee,neet,webd,career counseling
subject: { type: String, default:'PHYSICS', enum: ['PHYSICS','MATHS','CHEMESTRY','BIOLOGY','PCM','PCB']},

//deafult and mutable attribytes
});
   
menteeSchema.virtual('name').get(function() {
  var fullname = '';

  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name;
  }

  if (!this.first_name && !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for this Mentee instance URL.
menteeSchema.virtual('url').get(function() {
  return '/mentors/:mentorId/' + this._id;
});

export default model('Mentee' ,menteeSchema)
