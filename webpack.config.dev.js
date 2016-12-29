import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import projectConfig from './config/project';
import webpack from 'webpack';

const entry = {
  main: [
    projectConfig.path.source('index.js'),
    `webpack-hot-middleware/client?path=${projectConfig.publicPath}__webpack_hmr`
  ],
  vendor: projectConfig.getNodeModules()
};

const resolve = {
  extensions: ['', '.js']
};

const output = {
  path: projectConfig.path.dist(),
  publicPath: projectConfig.publicPath,
  filename: '[name].js'
};

const loaders = [
  { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
  { test: /\.css/, loaders: ['style', 'css'] }
];

const plugins = [
  //Use CommonsChinkPlugin to create a separate bundle of vendor libaries so that they are cached separately.
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }),

  // Enable Hot Module Replacement
  new webpack.HotModuleReplacementPlugin(),

  // Skip the asset emit in case any errors are detected during the build stage.
  new webpack.NoErrorsPlugin(),

  // Create HTML file that includes reference to bundle JS.
  new HtmlWebpackPlugin({
    template: projectConfig.path.source('index.html'),
    filename: 'index.html',
    favicon: projectConfig.path.public('favicon.ico'),
    hash: false,
    inject: 'body'
  })
];

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: entry,
  target: 'web',
  resolve: resolve,
  output: output,
  module: {
    loaders: loaders
  },
  plugins: plugins
};
