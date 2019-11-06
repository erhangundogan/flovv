module.exports = {
  collectCoverage: false,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/__tests__/!(*.test).js',
    '!index.js'
  ],
  coverageReporters: ['text'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
  verbose: false,
  moduleFileExtensions: ['js'],
  rootDir: 'src'
};
