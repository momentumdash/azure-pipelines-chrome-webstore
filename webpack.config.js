const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	target: 'node',
	node: {
		__dirname: false,
		__filename: false
	},
	mode: "production",
	entry: {
		GetStatus: './src/Tasks/GetStatus/index.ts',
		UpdateItem: './src/Tasks/UpdateItem/index.ts',
		PublishItem: './src/Tasks/PublishItem/index.ts'
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: '[name]/bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new CopyPlugin([
			{
				from: 'images',
				to: 'images'
			},
			{
				from: 'vss-extension.json',
			},
			{
				from: 'src/**/task.json',
				transformPath(targetPath) {
					return path.relative('src/Tasks', targetPath);
				},
			},
			{
				from: 'src/**/icon.png',
				transformPath(targetPath) {
					return path.relative('src/Tasks', targetPath);
				},
			}
		]),
	],
};
