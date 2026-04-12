
import{test, expect, Page} from '@playwright/test';
import { SauceDemoUsers } from '../utils/test-data';

test('Login to Sauce Demo', async ({page}) => {

await page.goto('https://www.saucedemo.com');

await page.getByPlaceholder('Username').fill('standard_user');

await page.getByPlaceholder('Password').fill('secret_sauce');

await page.getByRole('button', {name: 'Login'}).click;

await page.waitForURL('**/inventory.html');

await expect(page.getByText('Products')).toBeVisible();
});


//Variable types
const username: string = 'standard_user';
const price: number = 29.99;
const inStock: boolean = true;

//Array types
const users: string[] = ['standard_user', 'locked_user', 'problem_user'];
const prices: number[] = [9.99, 29.99, 49.99];

//Object types
interface TestUser {

username: string;
password: string;
role: string;

}

const testUser: TestUser = {
    username: 'standard_user',
    password: 'secret_sauce',
    role: 'customer'
};

//Function types

//Function with typed parametres and return type
async function loginToSauceDemo (
    page: Page,
    username: string,
    password: string
): Promise<void>{
await page.goto('https://www.saucedemo.com/');
await page.locator('#user-name').fill(username);
await page.locator('#password').fill(password);
await page.locator('#login-button').click();
}

//Function returning a value
function getProductPrice(priceText: string): number{
    return parseFloat(priceText.replace('$', ''))
}




test('login with test data helper', async ({page}) => {

    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill(SauceDemoUsers.standard.username);
    await page.locator('#password').fill(SauceDemoUsers.standard.password);
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('/inventory.html');

})