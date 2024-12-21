import { expect, Locator, Page, BrowserContext } from '@playwright/test'
import { BasePage } from './base-page'
import { testConfig } from '../config/testConfig'
import logger from '../utils/Logger'


export class LoginPage extends BasePage {

    protected myAccountButton: Locator
    protected usernameInput: Locator
    protected passwordInput: Locator
    protected signInButton: Locator
    protected loggedInEmail: Locator
    protected myAccountLink: Locator
    protected simplyBeLogo: Locator
    protected signOutButton: Locator
    protected menuButton: Locator

    constructor(page: Page, context: BrowserContext)  {
        super(page, context)
        this.myAccountButton = page.getByTestId('signin-test').nth(1)
        this.usernameInput = page.locator('#username')
        this.passwordInput = page.locator('#password')
        this.signInButton = page.locator('#signInButton')
        this.loggedInEmail = page.locator('(//p[@class="contactDetailValue"])[4]')
        this.myAccountLink = page.getByTestId('my-account-link').nth(1)
        this.simplyBeLogo = page.locator('//img[@title="Simply Be logo"]')
        this.signOutButton = page.locator('//button[contains(text(),"Sign out")]')
        this.menuButton = page.locator('#hfMenuBtn')


    }

    /**
    * Validates login elements visibility.
    */
    async validateLoginScreen() {
        await expect(this.usernameInput, 'Waiting for username input to be visible').toBeVisible()
        await expect(this.passwordInput, 'Waiting for password input to be visible').toBeVisible()
        await expect(this.signInButton, 'Waiting for login button to be visible').toBeVisible()
    }

    /**
     * Logs into application with given credentials.
     * 
     * If no username and password are given, assign default env ones.
     * @param EMAIL - Username to be used on login.
     * @param password - Password for given username.
    */
    async enterUserLoginDetails(username?: string, password?: string) {
        try {
            username= testConfig.email
            password= testConfig.password
            // Login cannot be completed if either username of password are undefined, throws error
            if (username == undefined || password == undefined) {
                throw new Error('Please provide username and password to complete login')
            }
            await this.launchApplication()
            await expect(this.myAccountButton, 'Waiting for my account option to be visible').toBeEnabled();
            await this.myAccountButton.click()
            await expect(this.usernameInput, 'Waiting for username input to be visible').toBeVisible()
            await this.usernameInput.fill(username)
            await expect(this.passwordInput, 'Waiting for password input to be visible').toBeVisible()
            await this.passwordInput.fill(password)
            await expect(this.signInButton, 'Expect sign in button to be enabled').toBeEnabled()
            await this.signInButton.click()
            await this.page.waitForLoadState()
        } catch (error) {
            logger.error('Error clicking sign in button : ' + error)
            throw error
        }
    }

    /**
     *  Function to validate user is logged in
     */
    async validateUserIsLoggedIn() {
        try {
            await expect(this.myAccountLink, 'Expect my account link to be visible').toBeVisible();
            await this.myAccountLink.click()
            await this.page.waitForLoadState()
            await this.page.waitForURL('**/shop/myaccount/Overview.action?finalTarget=accountmainmenu&nbg=true')
            expect(this.loggedInEmail, 'Validating user was redirected to account page after login').toHaveText(testConfig.email)
            await this.simplyBeLogo.click()
        } catch (error) {
            logger.error('Error in validating sign in user : ' + error)
            throw error
        }
    }

    /**
     *  Function to validate user is logged out
     */

    async validateUserIsLoggedOut() {
        try {
            await expect(this.menuButton, 'Expect menu button to be visible').toBeVisible()
            await this.menuButton.click()
            await expect(this.signOutButton, 'Expect sign out button to be visible').toBeVisible()
            await this.signOutButton.click()
            await this.page.waitForLoadState()
            await expect(this.myAccountButton, 'Expect my account button to be available').toBeVisible()
        } catch (error) {
            logger.error('Error clicking sign out button : ' + error)
            throw error
        }
    }

}
