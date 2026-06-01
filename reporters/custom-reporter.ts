
import{FullConfig, Suite, Reporter, TestCase, TestResult, FullResult} from '@playwright/test/reporter';

class CustomReporter implements Reporter {

   onBegin(config: FullConfig, suite: Suite){
       console.log(`Starting test run with ${suite.allTests().length} tests`);
   }

   onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status === 'passed' ? '✓' : '✗';

    console.log(`${status} ${test.title} (${result.duration}ms)`);

   }

   onEnd(result: FullResult){

    console.log(`\nFinished test run: ${result.status}`);
    console.log(`Total: ${result.duration}ms`);

   }
}

export default CustomReporter;