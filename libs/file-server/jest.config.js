module.exports = {
  displayName: 'file-server',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/file-server',
  watchPlugins: [
    [
      'jest-watch-typeahead/filename',
      {
        key: 'F',
        prompt: 'do something with my custom prompt',
      },
    ],
    [
      'jest-watch-typeahead/testname',
      {
        key: 'T',
        prompt: 'do something with my custom prompt',
      },
    ],
  ],
};
