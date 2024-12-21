import { expect, Browser, BrowserContext, Locator, Page } from '@playwright/test'
import test, { beforeEach } from 'node:test'
import logger from '../utils/Logger'

export class BasePage {

    protected page: Page
    protected context: BrowserContext
    protected browser: Browser
    protected acceptCookiesButton: Locator  

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.browser = this.browser
        this.acceptCookiesButton = page.locator('button#onetrust-accept-btn-handler')

    }

    /**
     * Funtion to open broser and provide application url
    */
    async launchApplication() {
        try {
            logger.info('Launching application')
            await this.context.clearCookies()
            await this.page.goto('/')
            .catch((error) => {
                logger.error('Unable to launch browser: ' + error)
                throw error;
              })
              .then(() => logger.info('Browser launched'));
            await this.acceptCookies()
        } catch (error) {
            logger.error('Error launching application' + error)
            throw error
        }
    }

    /**
     *  Function to accept cookies on application launch
    */
    async acceptCookies() {
        try {
            await expect(this.acceptCookiesButton, 'Waiting for cookies popup').toBeVisible()
            await this.acceptCookiesButton.click()
            await expect(this.acceptCookiesButton, 'Waiting for cookies popup to disappear').not.toBeVisible()
        } catch (error) {
            logger.error('Unable to accept cookies: ' + error)
            throw error
        }
    }

}