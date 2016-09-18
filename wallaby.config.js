module.exports = function() {
  return {
    files: [
      'index.js',
      'lib/**/*.js'
    ],

    tests: [
      'test/**/*.test.js'
    ],

    testFramework: 'mocha',

    env: {
      type: 'node'
    }
  };
};
