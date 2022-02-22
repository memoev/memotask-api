/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.js'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
};

module.exports = config;