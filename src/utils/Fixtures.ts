import { test as base, defineConfig } from '@playwright/test'
import { BasePage } from '../pages/base-page'
import { LoginPage } from '../pages/login-page'
import { UserRegistrationPage } from '../pages/user-registration-page'
import { AddProductsPage } from '../pages/add-products-page'
import { CatalogPage } from '../pages/catalog-page'



// I made this page to keep fixtures in order to avoid code repetition, to keep items organized.
type PageFixtures = {
    homePage: BasePage,
    loginPage: LoginPage,
    userRegistrationPage: UserRegistrationPage,
    addProductsPage: AddProductsPage
    catalogPage: CatalogPage

}

export const test = base.extend<PageFixtures>({
    
    homePage: async ({ page, context }, use) => {
        const homePage = new BasePage(page, context)
        await use(homePage)
    },

    loginPage: async ({ page, context }, use) => {
        const loginPage = new LoginPage(page, context)
        await use(loginPage)
    },

    userRegistrationPage: async ({ page, context }, use) => {
        const userRegistrationPage = new UserRegistrationPage(page, context)
        await use(userRegistrationPage)
    },

    addProductsPage: async ({ page, context }, use) => {
        const addProductsPage = new AddProductsPage(page, context)
        await use(addProductsPage)
    },

    catalogPage: async ({ page, context }, use) => {
        const catalogPage = new CatalogPage(page, context)
        await use(catalogPage)
    }


    

})