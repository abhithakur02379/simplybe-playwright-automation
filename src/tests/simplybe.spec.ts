import { test } from '../utils/Fixtures'
import logger from '../utils/Logger'

test('Verify new user can register successfully', {tag: ['@positive', '@userregistation']}, async ({ userRegistrationPage }) => {
    // logger.info('Test for new user registration started')
    await test.step('Naviagte to new user registration page', async () => {
        await userRegistrationPage.navigateToUserRegistation()
    })
    await test.step('Provide personal detils', async () => {
        await userRegistrationPage.providePersonalDetails()
    })
    await test.step('Provide address details', async () => {
        await userRegistrationPage.provideAddressDetails()
    })
    await test.step('Provide login details', async () => {
        await userRegistrationPage.provideLoginDetails()
    })
    await test.step('Provide communication consent details', async () => {
        await userRegistrationPage.provideConsentDetails()
    })
    // logger.info('Test for new user registration ended')

})


test('Veirfy user can log in successfully', {tag: ['@positive', '@validateUserIsLoggedIn']}, async ({ loginPage }) => {
    await test.step('Enter user credentials on login page', async () => {
        await loginPage.enterUserLoginDetails()
    })
    await test.step('Validate login is succussful', async () => {
        await loginPage.validateUserIsLoggedIn()
    })
    // logger.info('Test for user login ended')
})



test('Verify product should be added to bag successfully', {tag: ['@positive', '@addProductToBag']}, async ({ addProductsPage }) => {
    await test.step('Add product to bag', async () => {
        await addProductsPage.addProductToBag()
    })
    // logger.info('Test for adding product to bag ended')
})

test('Verify promotion code', {tag: ['@positive', '@applyPromoCode']}, async ({ loginPage, addProductsPage }) => {
    // logger.info('Test for applying promo code started')
    await test.step('Enter user credentials on login page', async () => {
        await loginPage.enterUserLoginDetails()
    })
    await test.step('Apply promotion code on checkout page', async () => {
        await addProductsPage.applyPromoCode()
    })
    await test.step('Validate promotion code', async () => {
        await addProductsPage.validatePromoCode()
    })
    // logger.info('Test for applying promo code ended')
})

test('Verify catalog items', {tag: ['@positive', '@browseCatalog']}, async ({ loginPage, catalogPage }) => {
    // logger.info('Test for verifying catalog items started')
    await test.step('Enter user credentials on login page', async () => {
        await loginPage.enterUserLoginDetails()
    })
    await test.step('Browse catalog on home page', async () => {
        await catalogPage.browseCatalog()
    })
    // logger.info('Test for verifying catalog items ended')
})

test('Veirfy user can log out successfully', {tag: ['@positive', '@validateUserIsLoggedOut']}, async ({ loginPage }) => {
    // logger.info('Test for user log out started')
    await test.step('Enter user credentials on login page', async () => {
        await loginPage.enterUserLoginDetails()
    })
    // await test.step('Log in through home page', async () => {
    //     await loginPage.validateUserIsLoggedIn()
    // })
    await test.step('Validate user is logged out successfully', async () => {
        await loginPage.validateUserIsLoggedOut()
    })
    // logger.info('Test for user log out ended')
})



