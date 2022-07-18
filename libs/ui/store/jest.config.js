module.exports = {
  displayName: 'ui-store',
  preset: '../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/ui/store',
  globalSetup: './jest.setup.js',
  setupFilesAfterEnv: ['./jest-after-env.setup.js'],
};
