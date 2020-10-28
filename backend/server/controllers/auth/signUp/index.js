import User from './../../../../database/models/users/index.js'
import DbErrorHandler from  '../../../helpers/errorHandlers/database/index.js'

import nodemailer  from 'nodemailer'
import pug  from 'pug'
import path from 'path'


const __dirname = path.resolve()

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'officialmentomeet@gmail.com',
      pass: 'Mm212@#$'
    }
});


  
  

function signUp(req, res){
    console.log(req.body)
    var mailOptions = {
        from: 'officialmentomeet@gmail.com',
        to: req.body.email,
        subject: 'Welcome to MentoMeet',
        html: pug.renderFile(path.join(__dirname, '/server/views/mail.pug'), { userName: `Hello, ${req.body.firstName}` })
      };
    const user  = new User(req.body)
    // console.log("User is - ");
    // console.log(user)
    user.save((err, result)=>{
        console.log("err is")
        console.log(err)
        if(err){
            let errorMessage = DbErrorHandler(err)
            console.log(err)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        res.json({
            result
        })
    })
}

export default signUp

