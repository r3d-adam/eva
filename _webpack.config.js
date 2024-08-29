'use strict';

import path from 'path';
import { fileURLToPath } from 'url';
// import OptimizePlugin from 'optimize-plugin';
// import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const webpackConfig = {
	mode: 'production', //development
	entry: './src/js/lib/formsubmit.js',

	output: {
		filename: 'plugin.min.js',
		path: __dirname + '/dist/',
	},
	watch: false,

	devtool: 'source-map',

	module: {
		rules: [
			{
				sideEffects: true,
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,

				options: {
					presets: [
						[
							'@babel/preset-env',
							{
								targets: 'ie >= 11',
								modules: false,
								useBuiltIns: 'usage',
								corejs: 3,
							},
						],
					],
				},
				// },
			},
		],
	},
};

webpackConfig.optimization = {
	minimize: true,
	minimizer: [
		new TerserPlugin({
			terserOptions: {
				keep_classnames: true,
			},
		}),
	],
};

export default webpackConfig;
