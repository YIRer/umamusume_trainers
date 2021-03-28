const commonPaths = require("./common-paths");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const port = process.env.PORT || 3000;

const config = {
  mode: "development",
  entry: {
    vendor: ["react", "react-dom"],
    app: [`${commonPaths.appEntry}/index.js`],
  },
  output: {
    filename: "[name].[hash].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
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
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],

  devServer: {
    contentBase: [commonPaths.appEntry, commonPaths.publicFolder],
    inline: true,
    compress: true,
    historyApiFallback: true,
    open: true,
    hot: true,
    port,
  },
};

module.exports = config;
