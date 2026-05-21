module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/lib/modules/gestion-dossiers'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'lib/modules/gestion-dossiers/**/*.ts',
    '!lib/modules/gestion-dossiers/**/*.test.ts',
    '!lib/modules/gestion-dossiers/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
