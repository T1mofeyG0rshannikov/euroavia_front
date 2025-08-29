const buildWebpackConfig = require("./config/build/buildWebpackConfig");
const path = require("path");

const  config = (env) => {

  const mode = env.mode || "development";
  const isDev = mode === "development";
  const PORT = env.port || 3000;

  const paths = {
    src:path.resolve(__dirname, 'src'),
    html: path.resolve(__dirname, "public", "index.html"),
    entry: path.resolve(__dirname, "src", "index.js"),
    build:path.resolve(__dirname, "build"),
  }

  const alias = {
    "@":path.resolve(__dirname, 'src'),
    "@icons":path.resolve(__dirname, 'src', 'shared', 'assets', 'icons'),
  }

  const options = {
    port: PORT,
    mode,
    isDev,
    paths,
    alias
  }

  return buildWebpackConfig(options);
}

module.exports = config;
