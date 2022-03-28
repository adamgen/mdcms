const getWebpackConfig = require('@nrwl/react/plugins/webpack');

function getWebpackConfig2(config) {
  config = getWebpackConfig(config);

  return {
    ...config,
    ignoreWarnings: [
      ...config.ignoreWarnings,
      // Disable the "@charset must precede all other statements" warning
      {
        module: /toastui-editor/,
      },
    ],
  };
}
module.exports = getWebpackConfig2;
