module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
    '!**/*.d.ts',
  ],
  moduleNameMapper: {
    '^~/(?!assets)(.*)$': '<rootDir>/src/$1',
    '^~/assets/(.*)$': '<rootDir>/assets/$1',
    "^__mocks__/(.*)$": "<rootDir>/__mocks__/$1",
    "\\.svg": "<rootDir>/__mocks__/svgMock.js"   
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  globalSetup: "<rootDir>/jest.global.js",
}
