import mongoose from '../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model // For date handling.
var mentorSchema = new Schema({   
  user:{type: Schema.Types.ObjectId, ref: 'User'},//set require true
  first_name: { type: String,  maxlength: 100 ,trim: true},//set required: true,
  last_name: { type: String,  maxlength: 100 ,trim:true},//set required: true,
  profile_picture: { type:String,default:""},
  phone: { type: Number,min:999999999,  max:10000000000},
  branch:{type: String, maxlength:100,trim:true},
  email:{ type: String, maxlength: 100,trim:true},//already taken during account creation
  college: { type: String, required: true, maxlength: 200 },
  year: { type: Number,  min: 1,required: true},
  college_type: { type: String,default:"IIT",enum:['IIT','NIT','AIIMS','IIIT','OTHER']},
  category: { type: String, default:'JEE', enum: ['CAREER','JEE','NEET','DEVELOPMENT'],trim:true},//ie. category jee,neet,webd,career counseling
  rank: { type: Number, min: 1 },
  badge:{ type: String,default:'general',enum:['general','bronge','slver','gold']},//based on performance
  fb_link: { type: String, },// dictionary for urls
  expertise: { type: Array, max:4, default:['Counselling']},
  linkedin_link:{ type: String,},
  language: { type: Array, max:3,default: ['English']},
  start_time: { type: String, maxlength: 100,required: true},
  end_time: { type: String, maxlength: 100,required: true},
  about_me: { type: String,maxlength: 2500,},
//documents for verifying
  college_id: { type: String, },//file field make  required: true
  resume:{ type: String},//file
//dynamic  attribytes,need fxns
  verification_status: { type: Boolean, default: false },//account verification,only admin can change status 
  call_count: { type: Number, default:0 },
//TODO-->total hrs talk  
});

mentorSchema.virtual('name').get(function() {
  var fullname = '';

  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name;
  }

  if (!this.first_name && !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for this mentorSchema instance URL.
mentorSchema.virtual('url').get(function() {
  return '/mentors/' + this._id;
});

export default model('Mentor' ,mentorSchema)
