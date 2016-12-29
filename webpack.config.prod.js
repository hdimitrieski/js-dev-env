import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import path from 'path';
import projectConfig from './config/project';
import webpack from 'webpack';

export default {
  debug: true,

  devtool: 'source-map',

  noInfo: false,

  entry: {
    vendor: path.resolve(__dirname, `${projectConfig.sourceDirirectory}/vendor`),
    main: path.resolve(__dirname, `${projectConfig.sourceDirirectory}/index`)
  },

  target: 'web',

  output: {
    path: path.resolve(__dirname, projectConfig.distDirectory),
    publicPath: projectConfig.publicPath,
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    // Ensures consistent build hashes
    new webpack.optimize.OccurenceOrderPlugin(),

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    //Use CommonsChinkPlugin to create a separate bundle of vendor libaries so that they are cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    // Create HTML file that includes reference to bundle JS.
    new HtmlWebpackPlugin({
      template: `${projectConfig.sourceDirirectory}/index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: 'body',
      // Properties defined here are available in index.html
      sentryDsn: 'https://274ca8bd38ff498697b1dc099ee2d553@sentry.io/125249'
    }),

    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  }
};
