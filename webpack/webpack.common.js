const commonPaths = require("./common-paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = {
  output: {
    path: commonPaths.outputPath,
  },
  resolve: {
    modules: [commonPaths.appEntry, "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /(node_modules|schema)/,
        use: ["ts-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|schema)/,
        use: ["babel-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = config;
