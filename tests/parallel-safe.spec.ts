
import{ test, expect} from '@playwright/test';



test.describe('Parallel Safe Tests', () => {
    test.describe.configure({mode: 'parallel'});
 
// These tests can run in parallel
 
test('test 1', async ({ page }) => {
 
// Independent test
 
});
 
test('test 2', async ({ page }) => {
 
// Independent test
 
});
 
});



test.describe('Serial Tests', () => {
    test.describe.configure({mode: 'serial'});
 
// These tests run one after another
 
test('setup test', async ({ page }) => {
 
// Must run first
 
});
 
test('dependent test', async ({ page }) => {
 
// Depends on setup
 
});
 
});


//Test sharding for CI/CD
//Split tests across multiple machines:

/* # GitHub Actions example:
name: Playwright Tests
on: [push, pull_request]
 
jobs:
 
test:
 
runs-on: ubuntu-latest
 
strategy:
 
matrix:
 
shard: [1, 2, 3, 4]
 
steps:
 
- uses: actions/checkout@v3
 
- uses: actions/setup-node@v3
 
- name: Install dependencies
 
run: npm ci
 
- name: Install Playwright
 
run: npx playwright install --with-deps
 
- name: Run tests
 
run: npx playwright test --shard=${{ matrix.shard }}/4
 
- uses: actions/upload-artifact@v3
 
if: always()
 
with:

name: playwright-report-${{ matrix.shard }}
 
path: playwright-report/ */
