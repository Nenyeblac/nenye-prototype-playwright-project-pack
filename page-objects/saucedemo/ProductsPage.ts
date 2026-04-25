import { Page, Locator } from "@playwright/test";
import { SortOption } from "../../utils/saucedemo-data";
import { count } from "node:console";

export class ProductsPage {

    readonly page: Page;

    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;
    readonly sortDropDown: Locator;

    constructor(page: Page){

        this.page = page;

        this.pageTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');

        //Shopping cart badge - shows number of items in cart
        //returns empty if no items ()
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.sortDropDown = page.locator('[data-test="product_sort_container"]');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async getProductCount(): Promise<number>{
        return await this.inventoryItems.count();
    }

    async getProductNames(): Promise<string[]>{
        const items = await this.inventoryItems.all();
        const names: string[] = [];
        for (const item of items){
            const name = await item.locator('.inventory_item_name').textContent();
            
            if(name) names.push(name);
        }

        return names;
    }

    async addProductToCartByName(productName: string){
        const product = this.page.locator('.inventory_item', {hasText: productName});
        await product.locator('button:has-text("Add to cart")').click();
    }

    async removeProductFromCartByName(productName: string){
        const product = this.page.locator('.inventory_item', {hasText: productName});
        await product.locator('button:has-text("Remove")').click();
    }

    async getCartItemCount(): Promise<string>{
        if (await this.shoppingCartBadge.isVisible()){
            return await this.shoppingCartBadge.textContent() || '0';
        } else {
            return '0';
        }
    }

    async clickShoppingCart(){
        await this.shoppingCartLink.click();
    }

    async sortProducts (option: SortOption){
        await this.sortDropDown.selectOption(option);
    }

    async getProductPrice(productName: string): Promise<string>{
        const product = this.page.locator('.inventory_item', {hasText: productName});
        return await product.locator('.inventory_item_price').textContent() || '';
    }

    async isProductInCart(productName: string): Promise<boolean>{
        const product = this.page.locator('.inventory_item', {hasText: productName});
        const removeButton = product.locator('button:has-text("Remove")');

        return await removeButton.isVisible();
    }

    async isProductAvailable(productName: string): Promise<boolean>{
        const product = this.page.locator('.inventory_item', {hasText: productName});
        const addButton = product.locator('button:has-text("`add to cart")');
        return await addButton.isVisible();
    }

    async goToCart(){
        await this.shoppingCartLink.click();
    }

    //Wait methods for dynamic content
    async waitForProductsToLoad(){
        await this.page.waitForSelector('.inventory_item', {
            state: 'visible',
            timeout: 10000
        });
    }

    async waitForCartBadgeUpdate(expectedCount: string){
        await this.page.waitForFunction((count) => {
            const badge = document.querySelector('.shopping_cart_badge');
            return badge?.textContent === count;
        }, expectedCount);
    }

}