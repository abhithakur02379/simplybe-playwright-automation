import { Locator } from "@playwright/test";

export class Helper
{
/**
 * Function to generate random email id
 * @returns email id
 */

  generateRandomEmail(): string {
    const randomString = (length: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };
  
    const username = randomString(10); // Generate a random username of 10 characters
    const domain = randomString(5); // Generate a random domain of 5 characters
    const tld = ['com', 'org', 'net', 'io', 'co'].sort(() => 0.5 - Math.random())[0]; // Random top-level domain

    return `${username}@${domain}.${tld}`;

  }

  /**
   * Function to generate random UK mobile number
   * @returns 
   */

  generateUKPhoneNumber(): string {
    // Mobile numbers begin with '07' and have 9 more digits
    const generateMobileNumber = (): string => {
      const areaCode = '07'; // Mobile numbers start with 07
      const number = Math.floor(Math.random() * 1_000_000_000).toString().padStart(9, '0'); // 9 digits
      return `${areaCode}${number}`;
    };
  
    return generateMobileNumber();
  }
  

}
  