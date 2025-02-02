module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/?(*.)+(spec|test).ts'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
    detectOpenHandles: true,
};
