import{test, expect} from '@playwright/test';

//Manual Trace Recording

test('manual trace recording', async({page, context}) => {

    //start tracing
    await context.tracing.start({
        screenshots: true,
        snapshots: true
    });

    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    //Stop and save trace
    await context.tracing.stop({
        path: 'traces/saucedemo/login-trace.zip'
    });
});

//To view trace

//view specific trace:
//npx playwright show-trace traces/login-trace.zip

//view from test results:
//npx playwright show-trace test-results/path-to-trace.zip