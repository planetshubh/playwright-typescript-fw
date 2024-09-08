import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { encrypt, decrypt } from "../utils/cryptoJsUtil";
import { encryptEnvFile } from "../utils/EncryptEnvFile";

test ("login_test", async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.navigatgeToLoginPage()
    await loginPage.fillUsername(decrypt(process.env.userid!)) //! is for providing type sfaety which helps in reducing runtime error
    await loginPage.fillPassword(decrypt(process.env.password!)) // any value should have a type otherwise the error will occur, here ! is
                                                // checking for the not null value it is null then value will be undefined and runtime
                                                // error can be caused
    
    const homePage = await loginPage.clickLoginPage()
    homePage.expectServiceTitleToBeVisible()
});

test.skip ("sample Env test", async ({page}) =>{
    console.log(process.env.NODE_ENV)
    console.log(process.env.userid)
    console.log(process.env.password)
});

test.skip("Encryption test", async({page}) => {
    // console.log('SALT: ', process.env.SALT)
    // const str = "Hello World"
    // const encrypted = encrypt(str)
    // console.log('Encrypted: ',encrypted)
    // const decrypted = decrypt(encrypted)
    // console.log('Decrypted: ',decrypted)
    
    encryptEnvFile()
});