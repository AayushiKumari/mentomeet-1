import jwt from 'jsonwebtoken'

const PrivateKey = process.env.PRIVATE_JWT_KEY

export function generateToken(payload){
    let token

    token = jwt.sign(payload, PrivateKey)

    return token
}



