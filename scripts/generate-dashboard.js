const fs = require('fs');
const path = require('path');

//Read test results
const resultsPath = path.join(__dirname, '../test-results/results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

//Calculate statistics
const stats = {
    total: results.suites.reduce((acc, suite) => acct + suite.specs.length, 0),
    passed: 0,
    failed: 0,
    skipped: 0,
    duration: 0 
};

results.suites.forEach(suite => {
    suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
            if(test.status === 'passed') stats.passed++;
            else if(test.status === 'failed') stats.failed++;
            else if(test.status === 'skipped') stats.skipped++;
            stats.duration += tests.duration || 0;
        });
    });
});

//Generate HTML dashboard
const html = ` <!DOCTYPE html> <html> <head> <title>Test Dashboard</title> <style>
body { font-family: Arial, sans-serif; margin: 20px; } .stat { display: inline-block; margin: 10px; padding: 20px; border-radius: 8px; } .passed { background: #4CAF50; color: white; } .failed { background: #f44336; color: white; } .total { background: #2196F3; color: white; } </style> </head> <body> <h1>Playwright Test Dashboard</h1> <div class="stat total">Total: ${stats.total}</div> <div class="stat passed">Passed: ${stats.passed}</div> <div class="stat failed">Failed: ${stats.failed}</div> <div class="stat">Skipped: ${stats.skipped}</div> <div class="stat">Duration: ${(stats.duration / 1000).toFixed(2)}s</div> <h2>Pass Rate: ${((stats.passed / stats.total) * 100).toFixed(2)}%</h2> </body> </html> `;

fs.writeFileSync('dashboard.html', html);

console.log('Dashboard generated: dashboard.html');