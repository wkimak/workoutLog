const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './client/src/index.js',
	output: {
		path: path.join(__dirname, '/client/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
          {
          	test: /\.js$/,
          	exclude: /node_modules/,
          	use: {
          		loader: 'babel-loader'
          	}
          }
		]
	},
	plugins: [
      new HtmlWebpackPlugin({
        template: './client/src/index.html'
      	})
	]
}