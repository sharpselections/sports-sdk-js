const shared = require("@sports-sdk/jest/jest-preset")
module.exports = {
  ...shared,
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
