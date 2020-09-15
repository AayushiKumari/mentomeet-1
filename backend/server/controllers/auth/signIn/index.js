import User from '../../../../database/models/users/index.js'
import DbErrorHandler from  '../../../helpers/errorHandlers/database/index.js'
import {generateToken} from '../../../helpers/tokenHandler/index.js'

function signIn(req, res){    
   let {email,password} = req.body
   console.log("Req body - ");
   console.log(req.body)

   User.findOne({email},(err,user)=>{
       console.log("user is " + user)
       
       if(err){
           console.log(err)
           res.status(400).json({
               error:'email dont exist'
           })
       }else if(!user){
            res.status(401).json({
                error:'User doesnt exist'
            })
        }
        else if(user.authenticate(password)){
            let payload = {_id:user._id}
            let  token  =  generateToken(payload)
            res.cookie('t',token,{maxAge:9999})

            const {_id, firstName, lastName , email} = user
            const role=user.role
            const mobile=user.mobile
            return res.send({token:token, user :{_id, firstName, lastName , email , role,mobile}})
       }
       else{
           res.status(401).json({
               error:'email and password dont match'
           })
       }


   })
}


export default signIn