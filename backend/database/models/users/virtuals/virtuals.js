import {v1 as uuid} from 'uuid'
import crypto from 'crypto'

function addVirtual(Schema,name){
    Schema.virtual(name)
    .set(set)
    .get(get)

    Schema.methods = {
        authenticate(password) {
            return this.encryptedPassword(password) === this.hashedPassword;
        },
        encryptedPassword(password){
            if(password){
                return crypto.createHmac('sha1',this.salt).update(password).digest('hex')
            }
            else return ''
        }
    }

}
function get(){
    return this._password
}

function set(password){
    this._password = password
    this.salt = uuid()
    this.hashedPassword = this.encryptedPassword(password)
}
export default addVirtual