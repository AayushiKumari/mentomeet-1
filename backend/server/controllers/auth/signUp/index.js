import Admin2 from './../../../../database/models/admin2/index.js'
import DbErrorHandler from  '../../../helpers/errorHandlers/database/index.js'

function signUp(req, res){
    console.log(req.body)
    const admin2  = new Admin2(req.body)
    // console.log("User is - ");
    // console.log(user)
    admin2.save((err, admin2)=>{
        if(err){
            let errorMessage = DbErrorHandler(err)
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }
        res.json({
            admin2
        })
    })
}

export default signUp

