import expressJwt from 'express-jwt'
function authorizer(){
    console.log("we are checking authorizer")
    return expressJwt({
        secret:'12345-67890-09876-54321',//
        userProperty:'auth'
    })
}
//process.env.PRIVATE_JWT_KEY
export const isAuth = (req, res, next) => {
    console.log("We are checking isAuth")
    // console.log(req.auth,req.body.user)
    // console.log(req.body.user._id)
    var reqBodyUser = JSON.parse(req.body.user)
    let user = reqBodyUser && req.auth && (reqBodyUser._id == req.auth._id);
    // console.log(user)
    // console.log(JSON.parse(req.body.user))
    // console.log(req.auth._id)
    // console.log(req.body.user && req.auth)
    // console.log(req.body.user._id == req.auth._id)

    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

export const isAdmin1 = (req, res, next) => {
    console.log("we are checking isAdmin")
    // console.log(typeof(req.body.user))
    var reqBodyUser = JSON.parse(req.body.user) 
    if (reqBodyUser.role !== 'facultyMember') {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};

export const isAdmin2 = (req, res, next) => {
    console.log("we are checking isAdmin2")
    // console.log(typeof(req.body.user))
    var reqBodyUser = JSON.parse(req.body.user) 
    if (reqBodyUser.role !== 'admin2') {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};


export default authorizer