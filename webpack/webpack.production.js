const commonPaths = require("./common-paths");
const fs = require("fs-extra");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { imageRegex } = require("../constants");

function copyPublicFolder() {
  fs.copySync(commonPaths.publicFolder, commonPaths.outputPath, {
    dereference: true,
    filter: (file) => {
      return file !== commonPaths.appHtml && !imageRegex.test(file);
    },
  });
}

copyPublicFolder();

module.exports = {
  mode: "production",
  entry: {
    app: `${commonPaths.appEntry}/index`,
  },
  output: {
    filename: "[name].[hash].js",
    publicPath: process.env.PUBLIC_URL,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
  ],
};
