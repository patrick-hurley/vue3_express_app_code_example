'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const config = {
    setupFilesAfterEnv: ['<rootDir>/src/testing/setupTestEnv.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!axios)'],
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    testTimeout: 5000,
}
module.exports = config
