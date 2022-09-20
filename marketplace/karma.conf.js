module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-spec-reporter'),
    ],
    client: {
      clearContext: false,
      mocha: {
        timeout: 20000 // 20 seconds
      }
    },

    coverageReporter: {
      dir: require('path').join(
        __dirname,
        './coverage/show-case'
      ),
      reporters: [
        { type: 'html', subdir: '.' },
        { type: 'lcovonly', subdir: '.' },
        { type: 'text-summary' },
      ],
      fixWebpackSourcePaths: true,
    },
    reporters: ['kjhtml', 'spec'],


    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: false, // print the time elapsed for each spec
      failFast: false, // test would finish with error when a first fail occurs.
      prefixes: {
        success: '    OK: ',
        failure: 'FAILED: ',
        skipped: 'SKIPPED: ',
      },
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--remote-debugging-port=9222',
        ],
      },
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    browserDisconnectTolerance: 5,
    browserDisconnectTimeout: 20000,
    browserNoActivityTimeout: 40000
  });
};
