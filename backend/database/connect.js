import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


const __dirname = path.resolve() 
dotenv.config({path:path.resolve(__dirname , `.env`)}) 

//db connection
//process.env.DATABASE_URI
mongoose.connect(
  "mongodb+srv://ajay123a:bugatti123@ajaycluster.7vrgr.mongodb.net/mentomeet?retryWrites=true&w=majority",//
    {useNewUrlParser: true}
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

  export default mongoose