const { hostname } = require("./constants");
const WebpackBar = require("webpackbar");
const isProd = process.env.NODE_ENV === "production";

const images = {
  domains: isProd
    ? ["umamusume-trainers.s3.ap-northeast-2.amazonaws.com"]
    : ["localhost"],
};

module.exports = {
  env: {
    HOST: hostname,
  },
  rootDir: "src",
  webpack: (config, _options) => {
    config.plugins = [...config.plugins, new WebpackBar()];
    return config;
  },
  images,
};
