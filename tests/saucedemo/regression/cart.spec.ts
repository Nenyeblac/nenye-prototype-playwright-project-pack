import {test, expect } from "@playwright/test"
import{LoginPage} from '../../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from "../../../page-objects/saucedemo/ProductsPage";
import { CartPage } from '../../../page-objects/saucedemo/CartPage';


//Cart Item Display Tests

test.describe('Cart Item Display Details', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async({page}) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);

        //login before each test
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('should diplay correct quantity for each cart item', async({page}) => {

        //Add multiple items
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Bike Light');
        await productsPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
        
        await productsPage.clickShoppingCart();

        //Each item should have a quantity of 1
        const backPackDetails = await cartPage.getCartItemDetails('Sauce Labs Backpack');
        const bikeLightDetails = await cartPage.getCartItemDetails('Sauce Labs Bike Light');
        const tshirtDetails = await cartPage.getCartItemDetails('Sauce Labs Bolt T-Shirt');

        //Verify quantities
        expect(backPackDetails.quantity).toBe(1)
        expect(bikeLightDetails.quantity).toBe(1);
        expect(tshirtDetails.quantity).toBe(1);

        //verify names match expected
        expect(backPackDetails.name).toBe('Sauce Labs Backpack');
        expect(bikeLightDetails.name).toBe('Sauce Labs Bike Light');
        expect(tshirtDetails.name).toBe('Sauce Labs Bolt T-Shirt');
    });

    test('should display product descriptions in cart', async({page}) => {
        await productsPage.addProductToCartByName('Sauce Labs Backpack')
        await productsPage.addProductToCartByName('Sauce Labs Onesie')
        await productsPage.clickShoppingCart();

        //get descriptions from cart
        const backPackDescription = await cartPage.getProductDescription('Sauce Labs Backpack');
        const onesieDescription = await cartPage.getProductDescription('Sauce Labs Onesie');

        //verify descriptions exist and have content
        expect(backPackDescription).toBeTruthy();
        expect(( backPackDescription).length).toBeGreaterThan(0);
        expect( backPackDescription).toContain('carry.allTheThings()');

        expect(onesieDescription).toBeTruthy();
        expect(( onesieDescription).length).toBeGreaterThan(0);
        expect(onesieDescription).toContain('Rib snap');
    });
    
});