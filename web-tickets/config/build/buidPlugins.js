const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

function buildPlugins(options) {
  const {paths, isDev} = options;

  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    })
  ]

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
      }),
    )
  }

  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin()
    )
  }

  return plugins
}

module.exports = buildPlugins;