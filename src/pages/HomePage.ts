import { expect, Page } from "@playwright/test";

export default class HomePage{

    private readonly ServiceTitleLocator = "Service"

    constructor(private page : Page){}

    async expectServiceTitleToBeVisible(){
        // await expect(this.page.getByTitle(this.ServiceTitleLocator)).toBeVisible({timeout : 1500});
    }
}