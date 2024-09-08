let cryptoJSUtil = require("crypto-js")
let fs = require("fs")
let path = require("path")

const SALT = process.env.SALT || "defaultSALT"

const currentDir = __dirname

const root = path.resolve(currentDir, '..')

const configDir = path.resolve(root, 'config')

let envFilePath =  `${configDir}/.env`; // we use \\ for windows but / for macbook

if(process.env.NODEENV){
    envFilePath = `${configDir}/.env.${process.env.NODEENV}` 
}

console.log(envFilePath)


//Encrypt the value and return key-value pair 
export function encryptEnvFile(){
    const envFileContent = fs.readFileSync(envFilePath, 'utf8')
    const envFileLines = envFileContent.split("\n")

    const encryptedLines = envFileLines.map((line) =>{
        const[key, value] = line.split("=")

        if(value){
            const encryptValue = cryptoJSUtil.AES.encrypt(value,SALT).toString()
            return `${key} = ${encryptValue}`
        }

        return line
    });

    const upadtedEnvFileContent = encryptedLines.join("\n")
    fs.writeFileSync(envFilePath, upadtedEnvFileContent, 'utf8')
    console.log('Encryption complete, updated .env file')

}



export function decryptEnvFile(){
    const envFileContent = fs.readFileSync(envFilePath, 'utf8')
    const envFileLines = envFileContent.split("\n")

    const decryptedLines = envFileLines.map((line) =>{
        const[key, value] = line.split("=")

        if(value){
            const decryptValue = cryptoJSUtil.AES.decrypt(value,SALT).toString()
            return `${key} = ${decryptValue}`
        }

        return line
    });

    const upadtedEnvFileContent = decryptedLines.join("\n")
    fs.writeFileSync(envFilePath, upadtedEnvFileContent, 'utf8')
    console.log('Decryption complete, updated .env file')

}