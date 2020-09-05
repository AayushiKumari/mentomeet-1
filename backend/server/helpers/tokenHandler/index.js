import jwt from 'jsonwebtoken'

const PrivateKey = '12345-67890-09876-54321'

export function generateToken(payload){
    let token

    token = jwt.sign(payload, PrivateKey)

    return token
}



