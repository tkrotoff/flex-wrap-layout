// Do we want to run the tests with the polyfills?
import 'core-js';

// Needed for async/await inside the tests otherwise
// it generates "ReferenceError: regeneratorRuntime is not defined"
import 'regenerator-runtime/runtime';

// See [Event: 'unhandledRejection'](https://nodejs.org/api/process.html#process_event_unhandledrejection)
// See [Bluebird Error management configuration](http://bluebirdjs.com/docs/api/error-management-configuration.html)
process.on('unhandledRejection', (reason: Error | any, _promise: Promise<any>) => {
  throw reason;
});
