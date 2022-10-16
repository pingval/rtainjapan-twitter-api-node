/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@repositories/(.*)': '<rootDir>/src/repositories/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
  },
  moduleDirectories: [
    'node_modules',
    'src',
  ]
};