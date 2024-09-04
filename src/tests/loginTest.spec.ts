import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test("test", async ({page}) => {
    const loginPage = new LoginPage(page)

    await loginPage.navigatgeToLoginPage()
    await loginPage.fillUsername("shubh@sharklasers.com")
    await loginPage.fillPassword("1qazZAQ!")
    
    const homePage = await loginPage.clickLoginPage()
    homePage.expectServiceTitleToBeVisible()
});