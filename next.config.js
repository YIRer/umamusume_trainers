const { hostname } = require("./constants");
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
  images,
};
