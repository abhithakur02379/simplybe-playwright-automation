import { Helper } from "../utils/Helper"

let helper = new Helper()

const email = helper.generateRandomEmail()

export const testConfig = {

    baseURL: 'https://www.simplybe.co.uk/',
    email: email,
    password: 'Cocusautomation@2024',
    waitForElement: 120000,
}



