const buildPlugins = require("./buidPlugins");
const buildLoaders = require("./buildLoaders");
const buildResolve = require("./buildResolve");
const buildDevServer = require("./buildDevServer");
const path = require("node:path");

function buildWebpackConfig(options) {
  const {mode, paths, isDev} = options;

  return {
    mode,
    entry: paths.entry,
    devtool: isDev && "inline-source-map",
    output: {
      path:paths.build,
      filename: "js/[name].[contenthash:8].js",
      clean:true
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    }
    ,
    resolve: buildResolve(options),
    devServer: buildDevServer(options),

  }
}


module.exports = buildWebpackConfig;