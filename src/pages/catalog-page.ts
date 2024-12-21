import { expect, Locator, Page, BrowserContext } from '@playwright/test'
import { BasePage } from './base-page'
import catalogItemsValuesToVerify  from "../data/catalogPage.json"
import logger from '../utils/Logger'


export class CatalogPage extends BasePage {

    protected menuButton: Locator
    protected catalogItems: Locator
    protected passwordInput: Locator

    constructor(page: Page, context: BrowserContext)  {
        super(page, context)
        this.menuButton = page.locator('#hfMenuBtn')
        this.catalogItems = page.locator('//a[@class="Nav-module_NavButton__IW5Pz Nav-module_NavButton__chevronRight__phlYE"]')

    }

    /**
     *  Function to broser the catalog on the home page
     *  @param : catalog items
     */
    async browseCatalog() {
        try {
            await expect(this.menuButton, 'Waiting for account options to be visible').toBeVisible();
            await this.menuButton.click()
            const str: string = JSON.stringify(catalogItemsValuesToVerify.catalogItems)
            const result: string[] = str.split("|")
            const rows = this.catalogItems
            const count = await rows.count()
            for (let i = 0; i < count; i++){
                console.log('data from json = ' + result[i].replace('"',"").trim())
                const texts = await rows.evaluateAll(
                    list => list.map(element => element.textContent));
                console.log('data from webpage = ' + texts[i]?.trim())
                if (texts[i]?.trim() === result[i].replace('"',"").trim()) {
                    logger.info('Catalog values are same')
                } else{
                    logger.error('Catalog values are not matched')
                }
            }
        }
        catch (error) {
            logger.error('Error in browsing catalog' + error)
        }
    }

}