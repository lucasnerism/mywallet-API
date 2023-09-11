const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: ['<rootDir>/tests/*.(test|spec).js'],
  transformIgnorePatterns: [`/node_modules`]
};

module.exports = config;