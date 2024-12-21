import { expect, Locator, Page, BrowserContext } from '@playwright/test'
import { BasePage } from './base-page'
import { Helper } from '../utils/Helper'
import { testConfig } from '../config/testConfig'
import userDetails from '../data/userRegistrationPage.json'
import logger from '../utils/Logger'


export class UserRegistrationPage extends BasePage {

    protected myAccountButton: Locator
    protected newCustomerButton: Locator
    protected newCustomerDetailsPage: Locator
    protected customerTitle: Locator
    protected firstName: Locator
    protected lastName: Locator
    protected day: Locator
    protected month: Locator
    protected year: Locator
    protected phoneNumber: Locator
    protected address: Locator
    protected enterAddressManually: Locator
    protected email: Locator
    protected password: Locator
    protected emailConsent: Locator
    protected postConsent: Locator
    protected phoneConsent: Locator
    protected continuButton: Locator
    protected accountCreationMessage: Locator
    protected manualAddressForm: Locator
    protected houseNumber: Locator
    protected houseName: Locator
    protected flatNumber: Locator
    protected city: Locator
    protected postCode: Locator
    protected deliverButton: Locator

    constructor(page: Page, context: BrowserContext)  {
        super(page, context)
        this.myAccountButton = page.getByTestId('signin-test').nth(1)
        this.newCustomerButton = page.locator('#newCustomerButton')
        this.newCustomerDetailsPage = page.getByRole('heading', { name: 'A little bit about you' })
        this.customerTitle = page.locator('#salutation')
        this.firstName = page.locator('#firstName')
        this.lastName = page.locator('#lastName')
        this.day = page.locator('#day').nth(1)
        this.month = page.locator('#month').nth(1)
        this.year = page.locator('#year').nth(1)
        this.phoneNumber = page.locator('#phoneNumber')
        this.address = page.locator('#address')
        this.enterAddressManually = page.getByRole('button', { name : 'Enter manually'})
        this.email = page.locator('#email')
        this.password = page.locator('#password')
        this.emailConsent = page.locator('#emailOptOut')
        this.postConsent = page.locator('#postOptOut')
        this.phoneConsent = page.locator('#phoneOptOut')
        this.continuButton = page.getByRole('button', { name: 'Continue' })
        this.accountCreationMessage = page.getByText('Account created !')
        this.manualAddressForm = page.locator('#manualAddressForm')
        this.houseNumber = page.locator('#manualAddress-houseNumber').nth(1)
        this.houseName = page.locator('#manualAddress-houseName').nth(1)
        this.flatNumber = page.locator('#manualAddress-flatNumber').nth(1)
        this.city = page.locator('#manualAddress-town').nth(0)
        this.postCode = page.locator('#manualAddress-postcode').nth(0)
        this.deliverButton = page.getByRole('button', { name : 'Deliver to this address'})

    }

    /**
     *  Function to navigate to user registration page
     */
    async navigateToUserRegistation() {
        try {
            await this.launchApplication()
            await expect(this.myAccountButton, 'Waiting for account options to be visible').toBeEnabled();
            await this.myAccountButton.click()
            await expect(this.newCustomerButton, 'Waiting for I am a new customer button to be visible').toBeEnabled();
            await this.newCustomerButton.click()
            await expect(this.newCustomerDetailsPage, 'Waiting for I am a new customer button to be visible').toBeVisible()
        } catch (error) {
            logger.error('Error in navigation to new user registration page : ' + error)
            throw error
        }
    }

    /**
     *  Function to provide user personal details
     *  @param : user title
     *  @param : first name
     *  @param : last name
     *  @param : birth date
     *  @param : birth month
     *  @param : birth year
     *  @param : UK mobile number
     */
    async providePersonalDetails(){
        let helper = new Helper()
        try {
            await this.customerTitle.selectOption(userDetails.customerTitle)
            await this.firstName.fill(userDetails.firstName)
            await this.lastName.fill(userDetails.lastName)
            await this.day.fill(userDetails.dayOfBirth)
            await this.month.fill(userDetails.monthOfBirth)
            await this.year.fill(userDetails.yearOfBirth)
            await this.phoneNumber.fill(helper.generateUKPhoneNumber())
        } catch (error) {
            logger.error('Error providing personal details : ' + error)
            throw error
        }
    }

    /**
     *  Function to provide user adddress details
     *  @param : generic address
     *  @param : house number
     *  @param : house name
     *  @param : flat number
     *  @param : city
     *  @param : post code
     */

    async provideAddressDetails(){
        try {
            await this.address.fill(userDetails.genericAddress)
            await expect(this.enterAddressManually, 'Waiting for enter manual addres link to be visible').toBeVisible();
            await this.enterAddressManually.click()
            await expect(this.manualAddressForm, 'Waiting for manual address form to be visible').toBeVisible()
            await this.houseNumber.fill(userDetails.houseNumber)
            await this.houseName.fill(userDetails.houseName)
            await this.flatNumber.fill(userDetails.flatNumber)
            await this.city.fill(userDetails.city)
            await this.postCode.fill(userDetails.postCode)
            await expect(this.deliverButton, 'Waiting for deliver to this address to be visible').toBeVisible();
            await this.deliverButton.click()
        } catch (error) {
            logger.error('Error providing address details : ' + error)
            throw error
        }
    }

    /**
     *  Function to provide user login details
     *  @param : email id
     *  @param : password
     */

    async provideLoginDetails(){
        try {
            await this.email.fill(testConfig.email)
            await this.password.fill(testConfig.password)
        } catch (error) {
            logger.error('Error providing login details : ' + error)
            throw error
        }
    }

    /**
     *  Function to provide user communication conesent details
     *  @param : email consent
     *  @param : post consent
     *  @param : phone consent
     */

    async provideConsentDetails(){
        try {
            await this.emailConsent.click()
            await this.postConsent.click()
            await this.phoneConsent.click()
            await this.continuButton.click()
            await expect(this.accountCreationMessage, 'Waiting for Account to be created successfully').toBeVisible()
        } catch (error) {
            logger.error('Error providing communication consent details : ' + error)
            throw error
        }
    }


}