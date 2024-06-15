const { hostname } = require("./constants");
const WebpackBar = require("webpackbar");

const images = {
  domains: ["umamusume-trainers.s3.ap-northeast-2.amazonaws.com"],
};

module.exports = {
  env: {
    HOST: hostname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  rootDir: "src",
  webpack: (config, _options) => {
    config.plugins = [...config.plugins, new WebpackBar()];
    return config;
  },
  images,
};
