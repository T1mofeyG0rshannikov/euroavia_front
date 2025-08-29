const MiniCssExtractPlugin = require('mini-css-extract-plugin')


function buildLoaders(options) {
	const { isDev, paths } = options

	const babelLoader = {
		test: /\.(js|jsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader'
		}
	}

	const cssLoader = {
		test: /\.(css|s[ca]ss)$/,
		use: [
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath) => resPath.includes('.module.'),
						namedExport: false,
						localIdentName: isDev ?
							'[path][name]__[local]__[hash:base64:5]' :
							'[hash:base64:8]'
					}

				}
			},
			'postcss-loader',
			'sass-loader'
		]
	}

	const fontsLoader = {
		test: /\.(woff|woff2|eot|ttf|otf)$/,
		type: 'asset/resource',
		generator: {
			filename: 'assets/fonts.scss/[name][hash][ext]'
		}
	}

	const imageLoader = {
		test: /\.(png|jpe?g|gif)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'assets/images/[name][hash][ext]'
		}
	}

	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: ['@svgr/webpack'],
	}


	const videoLoader = {
		test: /\.(mp4|webm|ogg)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'assets/videos/[name][hash][ext]'
		}
	}


	return [babelLoader, cssLoader, fontsLoader, svgLoader, imageLoader, videoLoader]
}

module.exports = buildLoaders