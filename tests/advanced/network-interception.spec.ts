//Intercepting Network Requests

import{test, expect} from '@playwright/test';

test.describe('Network Interception', () => {

    test('intercept and log API calls', async({page}) => {

        const apiCalls: string[] = [];

        //listen to all requests
        page.on('request', request => {
            if (request.url().includes('/api/') || request.url().includes('json')) {
                apiCalls.push(`${request.method()} ${request.url()}`);
                console.log('Request: ', request.method(), request.url());
            }
        });

        //listen to all responses
        page.on('response', response => {
            if (response.url().includes('/api/') || response.url().includes('json')){
                console.log('Resonse: ', response.status(), response.url());
            }
        });

        await page.goto('https://jsonplaceholder.typicode.com/');
        console.log('Total API calls: ', apiCalls.length);
    });

    test('block specific requests', async({page}) => {

        //block image requests
        await page.route('**/*.{pnj,jpg,jpeg,gif,svg}', route => route.abort());

        //block analytics
        await page.route('**/analytics/**', route => route.abort());
        await page.route('**/ga/**', route => route.abort());
        await page.goto('https://the-internet.herokuapp.com/');
        //page should load faster without images
    });

    test('modify request headers', async ({page})=> {
        await page.route('**/*', route => {
            const headers = {
                ...route.request().headers(),
                'X-Custom-Header': 'Playwright-Tests',
                'Authorisation': 'Bearer fake-token'
            };

            route.continue({headers});
        });

        await page.goto('https://httpbin.org/headers');

        //verify custom header was sent
        const content = await page.textContent('pre');
        expect(content).toContain('X-Custom-Header');
    });

    test('mock API response', async({page}) => {

        //mock API endpoints
        await page.route('**/api/users', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    users: [
                        {id: 1, name: 'Mocked User 1'},
                        {id: 2, name: 'Mocked User 2'},
                    ]
                })
            });
        });

        //navigate and verify mocked data is used
        await page.goto('https://jsonplaceholder.typicode.com/users');
    });

    test('simulate network conditions', async({page, context}) => {

        //simulate slow network
        await context.route('**/*', async route => {
            await new Promise(resolve => setTimeout(resolve, 1000)); //1s delay
            await route.continue();
        });

        const startTime = Date.now();
        await page.goto('https://the-internet.herokuapp.com/');
        const loadTime = Date.now() - startTime;

        console.log('Page load time with delay: ', loadTime, 'ms');

        expect(loadTime).toBeGreaterThan(1000);
    });

    test('mock failed API response', async({page}) =>{
        await page.route('**/api/**', route => {
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'Internal Server Error',
                    message: 'Simulated API failure'
                })
            });
        });

        //Test how application handles API errors
    })

})