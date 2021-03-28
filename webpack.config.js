const commonConfig = require("./webpack/webpack.common");
const { merge } = require("webpack-merge");

const webpackOption = () => {
  const envConfig = require(`./webpack/webpack.${process.env.NODE_ENV}.js`);
  const mergedConfig = merge(commonConfig, envConfig);
  return mergedConfig;
};

module.exports = webpackOption;
