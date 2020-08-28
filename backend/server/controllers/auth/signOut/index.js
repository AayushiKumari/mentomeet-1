

function signOut(req, res){
    res.clearCookie('t')
    res.json({
        message:'signed out sucessfully'
    })

}

export default signOut