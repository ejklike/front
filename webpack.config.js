module.exports = {
	entry: './src/index.js',

	output: {
		path: __dirname + '/public/',
		filename: 'bundle.js'
	},

	devServer: {
		inline: true,
		port: 8888,
		contentBase: __dirname + '/public/'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__local__[hash:base64:5]'
			},
      {
        test: /\.json$/, 
        loader: 'json'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=8192'
      }
		]
	}
};

