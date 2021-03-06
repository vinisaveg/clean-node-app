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
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/server/**',
    '!<rootDir>/src/main/index.ts'
  ],
  coverageDirectory: 'coverage',
};