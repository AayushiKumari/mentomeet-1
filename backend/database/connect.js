import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


const __dirname = path.resolve() 
dotenv.config({path:path.resolve(__dirname , `.env`)}) 

//db connection
//process.env.DATABASE_URI
mongoose.connect(
  process.env.DATABASE_URI,//
    {useNewUrlParser: true}
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

  export default mongoose
