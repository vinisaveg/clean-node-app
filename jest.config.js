/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': "<rootDir>/src/$1"
  },
  verbose: true
};