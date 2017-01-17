return Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
]).then(function (providers) {
  var testing = providers[0];
  var testingBrowser = providers[1];

  // optional
  ['addProviders', 'inject', 'async'].forEach(function(functionName) {
    window[functionName] = testing[functionName];
  });

  testing.setBaseTestProviders(
    testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
  );
});
