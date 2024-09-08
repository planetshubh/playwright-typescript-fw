let cryptoJSUtil = require("crypto-js")

//Get the SALT from system env variable
const SALT = process.env.SALT || "defaultSalt"

export function encrypt(text: string){
    const cipherText = cryptoJSUtil.AES.encrypt(text, SALT).toString() 
    return cipherText
}

export function decrypt(cipherText: string){
    const bytes =  cryptoJSUtil.AES.decrypt(cipherText, SALT)
    const originalText = bytes.toString(cryptoJSUtil.enc.Utf8)
    return originalText
}