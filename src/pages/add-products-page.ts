import { expect, Locator, Page, BrowserContext } from '@playwright/test'
import { BasePage } from './base-page'
import { testConfig } from '../config/testConfig'
import { LoginPage } from './login-page'
import logger from '../utils/Logger'


export class AddProductsPage extends BasePage {

    protected searchButton: Locator
    protected dressesLink: Locator
    protected searchBar: Locator
    protected searchProductButton: Locator
    protected searchResultPage: Locator
    protected searchResult: Locator
    protected productsList: Locator
    protected addToBagButton: Locator
    protected selectSizeButton: Locator
    protected selectSizeHeading: Locator
    protected selectSize: Locator
    protected goToBagButton: Locator
    protected goToCheckOutButton: Locator
    protected promoCodeHeading: Locator
    protected promotionCodeInput: Locator
    protected addPromoButton: Locator
    protected errorMessage: Locator
    protected bagPageHeading: Locator
    protected navigateToBagButton: Locator
    protected removePromoCodeButton: Locator
    protected activePromotionCode: any

    constructor(page: Page, context: BrowserContext)  {
        super(page, context)
        this.searchButton = page.locator('#hfSearchBtn')
        this.dressesLink = page.locator('//span[contains(text(),"Dresses")]')
        this.searchBar = page.getByTestId('context-card-search-input')
        this.searchProductButton = page.locator('NormalSearchBtn')
        this.searchResultPage = page.getByText('Search results for')
        this.searchResult = page.getByText('Black Skinny Jeans')
        this.productsList = page.locator('//div[@class="productCardDiv"]').nth(3)
        this.addToBagButton = page.locator('//button[@aria-label="add to bag"]')
        this.selectSizeButton = page.locator('//button[@aria-label="select a size"]')
        this.selectSizeHeading = page.getByText('Select size')
        this.selectSize = page.locator('//button[@aria-label="16"]')
        this.goToBagButton = page.locator('//a[@id="GoToBagPDP"]')
        this.goToCheckOutButton = page.locator('//button[@aria-label="Go to checkout"]')
        this.promoCodeHeading = page.locator('#promotionCodeLabel')
        this.promotionCodeInput = page.locator('#promotionCodeInput')
        this.addPromoButton = page.locator('//div[starts-with(@class,"PromoCode_wrapper")]//button[@id="Addpromo"]')
        this.errorMessage = page.locator('//label[@class="PromoCode__label_error"]')
        this.bagPageHeading = page.getByRole('heading', { name: 'Bag' })
        this.navigateToBagButton = page.getByTestId('bagbutton-button')
        this.removePromoCodeButton = page.locator('(//span[contains(text(), "Remove")])[2]')
        this.activePromotionCode = page.locator('//div[@id="bag-info-banner"]//u').innerText()

    }

    /**
     *  Function to add product to bag
     *  @param : user email
     *  @param : user password
     */
    async addProductToBag() {
        let loginPage = new LoginPage(this.page, this.context)
        try {
            await loginPage.enterUserLoginDetails(testConfig.email, testConfig.password)
            await expect(this.dressesLink, 'Expect login button to be enabled').toBeVisible()
            await this.dressesLink.click()
            await this.productsList.click()
            await expect(this.addToBagButton, 'Waiting for account options to be visible').toBeVisible()
            await expect(this.selectSizeButton, 'Waiting for account options to be visible').toBeEnabled()
            await this.selectSizeButton.click()
            await this.selectSize.click()
            await this.addToBagButton.click()
            await expect(this.goToBagButton, 'Waiting for account options to be visible').toBeVisible()
            await this.goToBagButton.click()
            await expect(this.goToCheckOutButton, 'Waiting for account options to be visible').toBeVisible()
        } catch (error) {
            logger.error('Error adding product to bag : ' + error)
            throw error
        }
    }

    /**
     *  Function to apply promo code on checkout page
     */
    async applyPromoCode(){
        try {
            await this.navigateToBagButton.click()
            await expect(this.bagPageHeading, 'Waiting for bag page to be visible').toBeVisible();
            await expect(this.promoCodeHeading, 'Waiting for account options to be visible').toBeVisible();
            await this.promotionCodeInput.fill('EXTRA')
            await this.page.waitForURL('https://www.simplybe.co.uk/shop/bag')
            await this.addPromoButton.click()
        } catch (error) {
            logger.error('Error applying promo code : ' + error)
            throw error
        }
    }

    /**
     *  Function to validate applied promo code
     */
    async validatePromoCode(){
        try {
            await expect(this.removePromoCodeButton, 'Waiting for account options to be visible').toBeVisible()
        } catch (error) {
            logger.error('Error validating promo code : ' + error)
            throw error
        }
    }


}