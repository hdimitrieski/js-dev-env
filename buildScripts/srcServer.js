import chalk from 'chalk';
import config from '../webpack.config.dev';
import express from 'express';
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
/* eslint-disable no-console */

const port = process.env.PORT || 3000;
const host = process.env.HOST ||'localhost';
const app = express();
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(
    compiler, {
      noInfo: false,
      publicPath: config.output.publicPath
    }
  )
);

app.use(
  webpackHotMiddleware(compiler)
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  } else {
    console.log('Listening at http://' + host + ':' + port);
    open(chalk.green('http://' + host + ':' + port));
  }
});
