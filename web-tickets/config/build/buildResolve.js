function buildResolve(options) {
  const { paths, alias } = options;

  return {
    extensions: ['.js', '.jsx'],
    alias,
    preferAbsolute:true,
    modules:[paths.src, 'node_modules'],
    mainFiles:['index'],

  }
}

module.exports = buildResolve;