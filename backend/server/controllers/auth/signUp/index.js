import User from './../../../../database/models/users/index.js'
import DbErrorHandler from  '../../../helpers/errorHandlers/database/index.js'

function signUp(req, res){
    console.log(req.body)
    const user  = new User(req.body)
    // console.log("User is - ");
    // console.log(user)
    user.save((err, result)=>{
        console.log("err is")
        console.log(err)
        if(err){
            let errorMessage = DbErrorHandler(err)
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }
        res.json({
            result
        })
    })
}

export default signUp

