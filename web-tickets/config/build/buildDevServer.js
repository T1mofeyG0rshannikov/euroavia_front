const path = require("node:path");

function buildDevServer(options) {
  const {port, paths} = options

  return {
    port,
    open: true,
    hot: true,
    historyApiFallback: true,
  }
}


module.exports = buildDevServer;