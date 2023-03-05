/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/__tests__/config/setTestEnv.ts'],
  modulePathIgnorePatterns: ['<rootDir>/__tests__/config/', '<rootDir>/build/'],
}
