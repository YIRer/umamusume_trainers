const path = require("path");
const PROJECT_ROOT = path.resolve(__dirname, "../");

module.exports = {
  projectRoot: PROJECT_ROOT,
  outputPath: path.join(PROJECT_ROOT, "build"),
  appEntry: path.join(PROJECT_ROOT, "src"),
  publicFolder: path.join(PROJECT_ROOT, "public"),
  appHtml: path.join(PROJECT_ROOT, "public/index.html"),
};
