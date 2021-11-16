const { hostname } = require("./constants");
const isDev = process.env.NODE_ENV === "development";

const images = {
  domains: isDev ? ["umamusume-trainers.s3.ap-northeast-2.amazonaws.com"] : [],
};

module.exports = {
  env: {
    HOST: hostname,
  },
  images,
};
