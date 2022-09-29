import Cryptr from 'cryptr';
import dotenv from 'dotenv';

dotenv.config()
const cryptr = new Cryptr(process.env.SECRET_KEY || "secredo")

function encrypt(data:string){
    return cryptr.encrypt(data)
}
function decrypt(data:string){
    return cryptr.decrypt(data)
}

export  const crypt ={
    encrypt,
    decrypt
}